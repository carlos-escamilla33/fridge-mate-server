const {createAccount, deleteAccount, findAccountById, findAccountByEmail} = require("../../src/database/models/accountModel");
const {pool} = require("../../src/database/config/database");

describe("account model", () => {
  let testAccount;
  let accountData;

  beforeAll(async () => {
    accountData = {account_name: "Riley's Fridge", first_name: "Riley",
       last_name: "Escamilla", password: "RileyRolls1", email: "noemail1@gmail.com" };
       
    await pool.query("TRUNCATE TABLE item, profile, account CASCADE");
  });

  afterAll(async () => {
    if (testAccount) {
      await deleteAccount(testAccount.account_id);
      testAccount = null;
    }
    pool.end();
  });

  test("Should create an account and check account attributes", async () => {
    testAccount = await createAccount(accountData);
    expect(testAccount.account.account_name).toBe("Riley's Fridge");
    expect(testAccount.account.email).toBe("noemail1@gmail.com");
  });

  test("Should find account by id", async () => {
    account = await findAccountById(testAccount.account.account_id);
    expect(account.account_id).toEqual(testAccount.account.account_id);
  });

  test("Should find account by email", async () => {
    account = await findAccountByEmail(testAccount.account.email);
    expect(account.email).toBe("noemail1@gmail.com");
  });


});
