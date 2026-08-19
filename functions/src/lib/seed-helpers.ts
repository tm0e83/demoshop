import * as admin from "firebase-admin";

export const COLLECTIONS = [
  "categories", "products", "users", "orders", "discounts",
] as const;
export type CollectionName = typeof COLLECTIONS[number];

export type SeedDoc = Record<string, unknown>;
export type SeedData = Record<CollectionName, Record<string, SeedDoc>>;

export const toTimestamp = (value: unknown): unknown => {
  return typeof value === "number" ?
    admin.firestore.Timestamp.fromMillis(value) :
    value;
};

export const normalizeDoc = (
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

export const randomIntBetween = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a shuffled copy of the given array (Fisher-Yates).
 * The original array is left untouched.
 * @param {T[]} array The array to shuffle.
 * @return {T[]} A new, shuffled array.
 */
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomIntBetween(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Assigns a "days ago" offset (1..7) to each id so that every one of the
 * last 7 days is guaranteed to have at least one entry. Any ids beyond the
 * first 7 get a random offset within the same range.
 * @param {string[]} ids The ids to distribute across the last 7 days.
 * @return {Map<string, number>} A day offset (1-7) for every given id.
 */
export const assignDayOffsets = (ids: string[]): Map<string, number> => {
  const dayOffsets = [1, 2, 3, 4, 5, 6, 7];
  const shuffledIds = shuffle(ids);
  const offsetById = new Map<string, number>();

  shuffledIds.forEach((id, index) => {
    const dayOffset = index < dayOffsets.length ?
      dayOffsets[index] :
      randomIntBetween(1, 7);
    offsetById.set(id, dayOffset);
  });

  return offsetById;
};
