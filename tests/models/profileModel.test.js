const {createProfile, findProfileByName} = require("../../src/database/models/profileModel");
const {pool} = require("../../src/database/config/database");
const { createAccount } = require("../../src/database/models/accountModel");

describe("Testing Profile Model Functions", () => {
    let profile;
    let profileData;
    let account;
    beforeAll(async () => {
        await pool.query("TRUNCATE TABLE item, profile, account CASCADE");
        profileData = {first_name: "Eris", last_name: "Carvalho"}
        let accountData = {account_name: "Riley's Fridge", first_name: "Riley",
                last_name: "Escamilla", password: "RileyRolls1", email: "noemail1@gmail.com"}
        const info = await createAccount(accountData);
        account = info.account;
    });
    afterAll(async () => {
        pool.end();
    });
    
    test("should create a new profile", async () => {
        profile = await createProfile(account.account_id, profileData.first_name, profileData.last_name);
        expect(profile).toBeDefined();
        expect(profile.first_name).toMatch(/Eris/);
        expect(profile.last_name).toMatch(/Carvalho/);
    });

    test("should find profile by first and last name", async () => {
        const foundProfile = await findProfileByName(profile.account_id, profile.first_name, profile.last_name);
        expect(foundProfile).toBeDefined();
        expect(foundProfile.first_name).toMatch(profile.first_name);
        expect(foundProfile.last_name).toMatch(profile.last_name);
    });
});