const {
  createAccount,
  deleteAccount,
} = require("../../src/models/accountModel");
const pool = require("../../src/config/database");

describe("account model", () => {
  let testAccount;
  let accountData;

  beforeEach(async () => {
    accountData = { account_name: "Test Family", account_code: "TEST123" };
  });

  afterEach(async () => {
    if (testAccount) {
      await deleteAccount(testAccount.account_id);
      testAccount = null;
    }
  });

  afterAll(async () => {
    pool.end();
  });

  test("should create an account", async () => {
    testAccount = await createAccount(accountData);
    expect(testAccount.account_name).toBe("Test Family");
  });
});
