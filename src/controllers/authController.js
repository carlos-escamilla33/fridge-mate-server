const { access } = require("fs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET, REFRESH_TOKEN_SECRET} = process.env;
const { promisify } = require('util'); 
const verifyAsync = promisify(jwt.verify);
const {createAccount, findAccountByEmail, authenticateLogins, updateAccountToken, updateAccountPassword, findAccountByEmailAndValidToken, invalidiateResetToken} = require("../database/models/accountModel");
const {sendResetEmail} = require("../utils/sendResetEmail");
const crypto = require('crypto');

const register = async (req, res, next) => {
    const {account_name, first_name, last_name, email, password} = req.body;
    try {
        const _account = await findAccountByEmail(email);

        if (_account) {
            throw new Error(
                {
                    name: "UserExistsError",
                    message: "User already exists"
                }
            );
        }
        if (password.length < 8) {
            throw new Error ({
                name: "PasswordLengthError",
                message: "Password length must be at least 8 characters long"
            });
        }

        const account = await createAccount(account_name, first_name, last_name, email, password);
        const accessToken = jwt.sign(
            {id: account.account_id, email: account.email},
            JWT_SECRET,
            {expiresIn: "15m"}
        );

        const refreshToken = jwt.sign(
            {id: account.account_id, email:account.email},
            REFRESH_TOKEN_SECRET,
            {expiresIn: "30d"}
        )

        res.send({
            message: "You Successfully Registered!",
            account,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        // all the work is done by the model function
        const account = await authenticateLogins(email, password);

        const accessToken = jwt.sign(
            {id: account.account_id, email: account.email},
            JWT_SECRET,
            {expiresIn: "1s"} // CHANGE THIS LATER, THIS IS JUST FOR TESTING
        );

        const refreshToken = jwt.sign(
            {id: account.account_id, email:account.email},
            REFRESH_TOKEN_SECRET,
            {expiresIn: "30d"}
        );

        res.send({
            message: "You Successfully Logged In!",
            account,
            accessToken,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
}

const forgotPassword = async (req, res, next) => {
    const {email} = req.body;
    try {
        const account = await findAccountByEmail(email);

        if (account) {
            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpiry = new Date(Date.now() + 3600000);

            await updateAccountToken(account.account_id, resetToken, resetTokenExpiry);

            await sendResetEmail(email, resetToken);
        }

        res.send({
            message: "If an account exists with that email, a reset link has been sent."
        });
    } catch (err) {
        next(err);
    }
}

const resetPassword = async (req, res, next) => {
    const {email, newPassword, resetToken} = req.body;
    try {
        const _account = await findAccountByEmailAndValidToken(email, resetToken);

        if (!_account) {
            throw new Error({
                message: "Invalid or expired reset link"
            });
        }

        await updateAccountPassword(email, newPassword);
        await invalidiateResetToken(resetToken);

        res.send({
            message: "Password reset successfully!",
        });
    } catch(err) {
        next(err);
    }
}

const refresh = async (req, res, next) => {
    const {refreshToken} = req.body;
    try {
       if (!refreshToken) {
        return res.sendStatus(403);
       }

       const user = await verifyAsync(refreshToken, REFRESH_TOKEN_SECRET);

       const accessToken = jwt.sign(
        {id: user.id, email: user.email},
        JWT_SECRET,
        {expiresIn: "15m"}
       );

       return res.send({accessToken});
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    refresh,
}

/*
UPDATE THE SCHEMA FOR THE ACCOUNT TABLE FOR TOKEN EXPIRATION
ADD A NEW MODEL FUNCTION FOR UPDATING THE TOKEN EXPIRATION DATE
*/