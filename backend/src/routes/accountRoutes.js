const express = require("express");
const accountRouter = express.Router();
const jwt = requre("jsonwebtoken");

const {
  createAccount,
  deleteAccount,
  getAllAccounts,
  updateAccountDetails,
  updateAccountPassword,
  findAccountByCode,
  findAccountById,
  findAccountByEmail,
  authenticateLogins,
} = require("../models/accountModel");

accountRouter.use((req, res, next) => {
    console.log("A request has been made to /account");
});

accountRouter.post("", async (req, res, next) => {

});
