const pool = require("../../src/config/database");

describe("database connection", () => {
  afterAll(async () => {
    await pool.end();
  });
  test("Checking connection to database", async () => {
    const res = await pool.query("SELECT NOW()");
    expect(res).toBeDefined();
    expect(res.rows.length).toBe(1);
  });
  test("Error catcher for database failing", async () => {
    await expect(
      pool.query("SELECT * FROM nonexistantTable")
    ).rejects.toThrow();
  });
});
