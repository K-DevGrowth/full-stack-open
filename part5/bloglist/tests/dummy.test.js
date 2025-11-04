const test = require("node:test");
const assert = require("node:assert");
const dummy = require("../utils/list_helper").dummy;

test("dummy returns one", () => {
  assert.strictEqual(dummy([]), 1);
});
