const bcrypt = require("bcrypt");

const hashPasswordHelper = async (password) => {
  const SALT_COUNT = 10;
  try {
    const cryptedPass = await bcrypt.hash(password, SALT_COUNT);
    return cryptedPass;
  } catch (err) {
    throw err;
  }
}

const generateCodeHelper = (account_name) => {
  return `${account_name}-${Math.floor(Math.random() * 10000)}`;
};

module.exports = {
    hashPasswordHelper,
    generateCodeHelper
}