import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const demoSlugs = [
  "cutz-by-jojo",
  "food-truck",
  "saffron",
  "selfcare-salon",
];

describe("bundled demo exports", () => {
  for (const slug of demoSlugs) {
    it(`${slug} has a self-contained static export`, () => {
      const demoDir = join(process.cwd(), "public", "demos", slug);
      const indexPath = join(demoDir, "index.html");
      const nextAssetsDir = join(demoDir, "_next");

      assert.equal(existsSync(indexPath), true, `${slug} index.html missing`);
      assert.equal(existsSync(nextAssetsDir), true, `${slug} _next assets missing`);
      assert.equal(statSync(indexPath).size > 1000, true, `${slug} index is too small`);

      const html = readFileSync(indexPath, "utf8");

      assert.match(
        html,
        new RegExp(`/demos/${slug}/_next/`),
        `${slug} must use scoped Next asset paths`,
      );
      assert.doesNotMatch(
        html,
        /(?<!\/demos\/[a-z-]+)\/_next\//,
        `${slug} must not reference root-level Next assets`,
      );
    });
  }
});
