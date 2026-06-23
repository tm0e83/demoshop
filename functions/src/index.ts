import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import initialData from "./data.json";

admin.initializeApp();

// RTDB seed data also contains `productsByCategory` and `userOrders`, which
// were denormalized lookup indexes for RTDB. Firestore queries
// (`array-contains` on `categoryIds`, `where('uid', ...)`) replace them, so
// they're intentionally not migrated.
const COLLECTIONS = [
  "categories", "products", "users", "orders", "discounts",
] as const;
type CollectionName = typeof COLLECTIONS[number];

type SeedDoc = Record<string, unknown>;
type SeedData = Record<CollectionName, Record<string, SeedDoc>>;

const toTimestamp = (value: unknown): unknown => {
  return typeof value === "number" ?
    admin.firestore.Timestamp.fromMillis(value) :
    value;
};

const normalizeDoc = (
  collectionName: CollectionName,
  data: SeedDoc
): SeedDoc => {
  const normalized: SeedDoc = {...data};

  if ("createdAt" in normalized) {
    normalized.createdAt = toTimestamp(normalized.createdAt);
  }

  const hasCategoryIds = collectionName === "products" &&
    normalized.categoryIds &&
    typeof normalized.categoryIds === "object";

  if (hasCategoryIds) {
    const categoryIds = normalized.categoryIds as Record<string, boolean>;
    normalized.categoryIds = Object.keys(categoryIds);
  }

  if (collectionName === "users" && typeof normalized.birthdate === "string") {
    const birthdate = new Date(normalized.birthdate);
    normalized.birthdate = admin.firestore.Timestamp.fromDate(birthdate);
  }

  if (collectionName === "orders" && Array.isArray(normalized.items)) {
    normalized.items = (normalized.items as SeedDoc[]).map((item) => ({
      ...item,
      createdAt: toTimestamp(item.createdAt),
    }));
  }

  if (collectionName === "discounts") {
    normalized.validFrom = toTimestamp(normalized.validFrom);
    normalized.validUntil = toTimestamp(normalized.validUntil);
  }

  return normalized;
};

const clearCollection = async (
  db: admin.firestore.Firestore,
  collectionName: CollectionName
) => {
  const snapshot = await db.collection(collectionName).get();

  for (let offset = 0; offset < snapshot.docs.length; offset += 500) {
    const batch = db.batch();
    const chunk = snapshot.docs.slice(offset, offset + 500);
    chunk.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
};

const seedCollection = async (
  db: admin.firestore.Firestore,
  collectionName: CollectionName,
  docs: Record<string, SeedDoc>
) => {
  const ids = Object.keys(docs);

  for (let offset = 0; offset < ids.length; offset += 500) {
    const batch = db.batch();
    ids.slice(offset, offset + 500).forEach((id) => {
      const docRef = db.collection(collectionName).doc(id);
      batch.set(docRef, normalizeDoc(collectionName, docs[id]));
    });
    await batch.commit();
  }
};

export const resetDatabase = onSchedule("0 2 * * *", async () => {
  const db = admin.firestore();
  const seedData = initialData as unknown as SeedData;

  try {
    for (const collectionName of COLLECTIONS) {
      await clearCollection(db, collectionName);
      await seedCollection(db, collectionName, seedData[collectionName] ?? {});
    }
    console.log("Firestore successfully reset to default state.");
  } catch (error) {
    console.error("Error resetting Firestore:", error);
  }
});

export const resetUsers = onSchedule("0 2 * * *", async () => {
  const listUsersResult = await admin.auth().listUsers();
  const users = listUsersResult.users;
  const usersToDelete = users.filter((u) => {
    return u.uid !== "yDoOOSVHzxXk8tnvWFeY2jtvlGh2" &&
      u.uid !== "ze1ShRe4QQMI4gxadeKFngjsDo22";
  }).map((u) => u.uid);

  try {
    await admin.auth().deleteUsers(usersToDelete);
    const count = usersToDelete.length;
    console.log(`${count} Benutzer wurden erfolgreich entfernt.`);
  } catch (error) {
    console.error("Error resetting users:", error);
  }
});
