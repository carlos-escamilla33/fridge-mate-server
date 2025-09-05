const pool = require("../config/database");

const createAccount = async ({ accountName, accountCode }) => {
  try {
    const {rows: [account]} = await pool.query(
      `
        INSERT INTO account(account_name, account_code)
        VALUES($1, $2)
        RETURNING *;
        `,
      [accountName, accountCode]
    );

    return account;
  } catch (err) {
    if (err.code == "23505") {
        throw new Error("Account name already exists");
    }
    throw err;
  }
};

const deleteAccount = async (id) => {
  try {
    const {rows: [account]} = await pool.query(
      `
      DELETE FROM account
      WHERE id=$1
      RETURNING *;
      `
    , [id]);
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
}
