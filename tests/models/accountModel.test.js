const {createAccount, deleteAccount, findAccountById,
   findAccountByEmail, updateAccountDetails, updateAccountPassword} = require("../../src/database/models/accountModel");
const {findProfilesByAccountId} = require("../../src/database/models/profileModel");
const {pool} = require("../../src/database/config/database");

describe("Testing Account Model Functions", () => {
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

  test("should create an account and check account attributes", async () => {
    testAccount = await createAccount(accountData);
    expect(testAccount.account.account_name).toBe("Riley's Fridge");
    expect(testAccount.account.email).toBe("noemail1@gmail.com");
  });

  test("should create a profile with every new account", async () => {
    const {profile} = testAccount;
    expect(profile.first_name).toEqual("Riley");
  });

  test("should find account by id", async () => {
    account = await findAccountById(testAccount.account.account_id);
    expect(account.account_id).toEqual(testAccount.account.account_id);
  });

  test("should find account by email", async () => {
    account = await findAccountByEmail(testAccount.account.email);
    expect(account.email).toBe("noemail1@gmail.com");
  });

  test("should update account name and email", async () => {
    const updatedAccountName = "Luna's fridge";
    const updatedEmail = "luna1@gmail.com";
    const accountId = testAccount.account.account_id;
    
    const updatedAccount = await updateAccountDetails(accountId, updatedAccountName, updatedEmail);
    testAccount.account = updatedAccount;
    expect(updatedAccount.account_name).toBe("Luna's fridge");
    expect(updatedAccount.email).toBe("luna1@gmail.com");
  });

  test("should update account password", async () => {
    const newPassword = "LunaChubby";

    const updatedAccount = await updateAccountPassword(testAccount.account.email, newPassword);
    expect(updatedAccount).toBeDefined();
  })

  test("should delete whole account", async () => {
    const deletedAccount = await deleteAccount(testAccount.account.account_id);
    expect(deletedAccount).toBeDefined();
  });

  test("should not find profiles from deleted account", async () => {
    const profiles = await findProfilesByAccountId(testAccount.account.account_id);

    for (let profile in profiles) {
      expect(profile).toBeUndefined();
    }
  });

});
