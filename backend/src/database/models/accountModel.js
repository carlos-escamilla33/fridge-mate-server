const {pool} = require("../config/database");
const { hashPasswordHelper, generateCodeHelper } = require("./helpers");

const createAccount = async (account_name, first_name, last_name, email, password) => {
  const client = await pool.connect();

  try {
    const accCode = generateCodeHelper(account_name);
    const hashedPassword = await hashPasswordHelper(password);

    await client.query("BEGIN");

    const {rows: [account]} = await client.query(
      `
        INSERT INTO account(account_name, account_code, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [account_name, accCode, email, hashedPassword]
    );

    const {rows: [profile]} = await client.query(
      `
        INSERT INTO profile(account_id, first_name, last_name, notifications_enabled)
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [account.account_id, first_name, last_name, true]
    );

    await client.query("COMMIT");

    delete account.password;

    return {
      account,
      profile,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    if (err.code == "23505") {
      throw new Error("Account name already exists");
    }
    throw err;
  } finally {
    client.release();
  }
};

const findAccountById = async (id) => {
  try {
    const {rows: [account]} = await pool.query(
      `
        SELECT * FROM account
        WHERE account_id=$1;
      `,
      [id]
    );
    return account;
  } catch (err) {
    throw err;
  }
};

const findAccountByEmail = async (email) => {
  try {
    const {rows: [account]} = await pool.query(
      `
      SELECT * FROM account
      WHERE email=$1
      `, [email]);

    return account;
  } catch (err) {
    throw err;
  }
}

const findAccountByCode = async (code) => {
  try {
    const {rows: [account]} = await pool.query(
      `
        SELECT * FROM account
        WHERE account_code=$1
      `,
      [code]
    );

    return account;
  } catch (err) {
    throw err;
  }
};

const getAllAccounts = async () => {
  try {
    const {rows} = await pool.query(`
      SELECT * FROM account
      `);
    return rows;
  } catch (err) {
    throw err;
  }
};

const updateAccountDetails = async ({ account_id, account_name, email}) => {
  try {
    const {rows: [account]} = await pool.query(
      `
        UPDATE account
        SET account_name=$1, email=$2
        WHERE account_id=$3
        RETURNING *;
      `,
      [account_name, email, account_id]
    );

    return account;
  } catch (err) {
    throw err;
  }
};

const updateAccountToken = async ({account_id, resetToken, resetTokenExpiry}) => {
  try {
    const {rows: [account]} = await pool.query(
      `
      UPDATE account
      SET reset_token=$1, reset_token_expiry=$2
      WHERE account_id=$3
      RETURNING *;
      `,
      [resetToken, resetTokenExpiry, account_id]
    );

    delete acccount.password;

    return account;
  } catch (err) {
    throw err;
  }
}

const updateAccountPassword = async (account_id, newPassword) => {
  try {
    const updatedHashedPassword = await hashPasswordHelper(newPassword);
    const {rows: [account]} = await pool.query(
      `
        UPDATE account
        SET password=$1
        WHERE account_id=$2
        RETURNING *;
      `,
      [updatedHashedPassword, account_id]
    );

    delete account.password;

    return account;
  } catch (err) {
    throw err;
  }
}

const deleteAccount = async (account_id) => {
  try {
    const {rows: [account],} = await pool.query(
      `
      DELETE FROM account
      WHERE account_id=$1
      RETURNING *;
      `,
      [account_id]
    );
    return account;
  } catch (err) {
    if (err.code == "42P01") {
      throw new Error("Account does not exist");
    }
    throw err;
  }
};

const authenticateLogins = async (email, password) => {
  try {
    const account = await findAccountByEmail(email);

    if (!account) {
      throw new Error("Invalid credentials");
    }

    const doPasswordsMatch = await bcrypt.compare(password, account.password);

    if (!doPasswordsMatch) {
      throw new Error("Invalid credentials");
    }

    delete account.password;

    return account;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createAccount,
  deleteAccount,
  getAllAccounts,
  updateAccountDetails,
  updateAccountPassword,
  findAccountByCode,
  findAccountById,
  findAccountByEmail,
  authenticateLogins,
  updateAccountToken
};
