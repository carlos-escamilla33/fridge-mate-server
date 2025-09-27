const {createAccount, findAccountByEmail} = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

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
        const token = jwt.sign(
            {id: account.account_id, email: account.email},
            JWT_SECRET,
            {expiresIn: "1w"}
        );

        res.send({
            message: "You Successfully Registered!",
            account,
            token,
        });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login
}