import {describe, it, expect} from "vitest";
import {
  assignDayOffsets,
  normalizeDoc,
  randomIntBetween,
  shuffle,
  toTimestamp,
} from "./seed-helpers";

describe("randomIntBetween", () => {
  it("stays within the given bounds", () => {
    for (let i = 0; i < 200; i++) {
      const value = randomIntBetween(1, 7);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(7);
    }
  });

  it("returns the only possible value when min equals max", () => {
    expect(randomIntBetween(5, 5)).toBe(5);
  });
});

describe("shuffle", () => {
  it("contains exactly the original elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("does not mutate the original array", () => {
    const input = [1, 2, 3];
    shuffle(input);
    expect(input).toEqual([1, 2, 3]);
  });
});

describe("assignDayOffsets", () => {
  it("guarantees every day (1-7) is used at least once when >= 7 ids", () => {
    const ids = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    const offsetById = assignDayOffsets(ids);
    const usedOffsets = new Set(offsetById.values());

    for (const day of [1, 2, 3, 4, 5, 6, 7]) {
      expect(usedOffsets.has(day)).toBe(true);
    }
  });

  it("assigns an offset to every id and only valid offsets (1-7)", () => {
    const ids = ["a", "b", "c"];
    const offsetById = assignDayOffsets(ids);

    expect(offsetById.size).toBe(ids.length);
    for (const offset of offsetById.values()) {
      expect(offset).toBeGreaterThanOrEqual(1);
      expect(offset).toBeLessThanOrEqual(7);
    }
  });
});

describe("toTimestamp", () => {
  it("converts a numeric value into a Firestore Timestamp", () => {
    const millis = Date.now();
    const result = toTimestamp(millis) as {toMillis: () => number};
    expect(result.toMillis()).toBe(millis);
  });

  it("leaves non-numeric values untouched", () => {
    expect(toTimestamp("already-a-string")).toBe("already-a-string");
    expect(toTimestamp(null)).toBeNull();
  });
});

describe("normalizeDoc", () => {
  it("converts createdAt into a Timestamp", () => {
    const millis = Date.now();
    const result = normalizeDoc("products", {createdAt: millis});
    const createdAt = result.createdAt as {toMillis: () => number};
    expect(createdAt.toMillis()).toBe(millis);
  });

  it("converts a products categoryIds map into an array of keys", () => {
    const result = normalizeDoc("products", {
      categoryIds: {"cat-1": true, "cat-2": true},
    });
    expect(result.categoryIds).toEqual(["cat-1", "cat-2"]);
  });

  it("converts a user's birthdate string into a Timestamp", () => {
    const result = normalizeDoc("users", {birthdate: "1990-01-01"});
    const birthdate = result.birthdate as {toDate: () => Date};
    expect(birthdate.toDate().getUTCFullYear()).toBe(1990);
  });

  it("converts createdAt of order items", () => {
    const millis = Date.now();
    const result = normalizeDoc("orders", {
      items: [{id: "item-1", createdAt: millis}],
    });
    type ItemWithTimestamp = {createdAt: {toMillis: () => number}};
    const items = result.items as ItemWithTimestamp[];
    expect(items[0].createdAt.toMillis()).toBe(millis);
  });

  it("converts discount validFrom/validUntil into Timestamps", () => {
    const validFrom = Date.now();
    const validUntil = validFrom + 1000;
    const result = normalizeDoc("discounts", {validFrom, validUntil});
    const from = result.validFrom as {toMillis: () => number};
    const until = result.validUntil as {toMillis: () => number};
    expect(from.toMillis()).toBe(validFrom);
    expect(until.toMillis()).toBe(validUntil);
  });

  it("does not mutate the input object", () => {
    const input = {createdAt: Date.now()};
    normalizeDoc("categories", input);
    expect(typeof input.createdAt).toBe("number");
  });
});
