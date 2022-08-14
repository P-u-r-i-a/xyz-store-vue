import { describe, test, expect } from "vitest";

describe("ProductView", () => {
  test("test 1", async () => {
    const cmp = await import("../src/views/ProductView.vue");
    expect(cmp).toBeDefined();
  });
});
