import { computeNormalizedQueryHash } from "../fatsecret/cacheKey";

describe("computeNormalizedQueryHash", () => {
  it("same food name regardless of casing produces the same hash", () => {
    expect(computeNormalizedQueryHash("Chicken", "g")).toBe(
      computeNormalizedQueryHash("chicken", "g")
    );
  });

  it("same food name with extra whitespace produces the same hash", () => {
    expect(computeNormalizedQueryHash("  chicken  ", "g")).toBe(
      computeNormalizedQueryHash("chicken", "g")
    );
  });

  it("different food names produce different hashes", () => {
    expect(computeNormalizedQueryHash("chicken", "g")).not.toBe(
      computeNormalizedQueryHash("beef", "g")
    );
  });

  it("same food name with different unit produces different hashes", () => {
    expect(computeNormalizedQueryHash("chicken", "g")).not.toBe(
      computeNormalizedQueryHash("chicken", "oz")
    );
  });

  it("unit casing is normalized", () => {
    expect(computeNormalizedQueryHash("chicken", "G")).toBe(
      computeNormalizedQueryHash("chicken", "g")
    );
  });
});
