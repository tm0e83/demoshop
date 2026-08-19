import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import initialData from "./data.json";
import {
  COLLECTIONS,
  assignDayOffsets,
  normalizeDoc,
} from "./lib/seed-helpers";
import type {CollectionName, SeedData, SeedDoc} from "./lib/seed-helpers";

admin.initializeApp();

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

import type {
  AddressType,
  CartItemType,
  DiscountType,
  PaymentMethodType,
  ShippingMethodType,
  UserType,
} from "@/typings";

export type OrderType = {
  billingAddress: AddressType;
  createdAt: number;
  id: string;
  items: CartItemType[];
  paymentMethodId: PaymentMethodType["id"];
  shippingAddress: AddressType;
  shippingMethodId: ShippingMethodType["id"];
  status: string;
  uid: UserType["id"];
  discounts: DiscountType[];
};

export const resetDatabase = onSchedule("0 2 * * *", async () => {
  const db = admin.firestore();
  const seedData = initialData as unknown as SeedData;

  try {
    for (const collectionName of COLLECTIONS) {
      await clearCollection(db, collectionName);

      if (collectionName === "orders") {
        const orders = structuredClone(seedData[collectionName]);
        const currentTimestamp = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        const dayOffsetById = assignDayOffsets(Object.keys(orders));

        dayOffsetById.forEach((dayOffset, id) => {
          orders[id].createdAt = currentTimestamp - dayOffset * oneDay;
        });

        await seedCollection(db, collectionName, orders);
        continue;
      }

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
