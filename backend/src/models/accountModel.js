const pool = require("../config/database");

const createAccount = async ({ account_name, account_code }) => {
  try {
    const {rows: [account]} = await pool.query(
      `
        INSERT INTO account(account_name, account_code)
        VALUES($1, $2)
        RETURNING *;
        `,
      [account_name, account_code]
    );

    return account;
  } catch (err) {
    if (err.code == "23505") {
        throw new Error("Account name already exists");
    }
    throw err;
  }
};

const deleteAccount = async (account_id) => {
  try {
    const {rows: [account]} = await pool.query(
      `
      DELETE FROM account
      WHERE account_id=$1
      RETURNING *;
      `
    , [account_id]);
    return account;
  } catch (err) {
    if (err.code == "42P01") {
      throw new Error("Account does not exist");
    }
    throw err;
  }
}

module.exports = {
    createAccount,
    deleteAccount,
}
