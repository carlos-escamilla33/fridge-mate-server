const {createProfile, findProfileByName, findProfileById, findProfilesByAccountId} = require("../../src/database/models/profileModel");
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
        const returnedProfile = await findProfileByName(profile.account_id, profile.first_name, profile.last_name);
        expect(returnedProfile).toBeDefined();
        expect(returnedProfile.first_name).toMatch(profile.first_name);
        expect(returnedProfile.last_name).toMatch(profile.last_name);
    });

    test("should find profile by profile id", async () => {
        const returnedProfile = await findProfileById(profile.profile_id);
        expect(returnedProfile).toBeDefined();
    });

    test("should find profiles by account id", async () => {
        const returnedProfiles = await findProfilesByAccountId(account.account_id);
        expect(returnedProfiles).toBeDefined();
        
        for (let i = 0; i < returnedProfiles.length; i++) {
            expect(returnedProfiles[i]).toBeDefined();
            expect(returnedProfiles[i].account_id).toEqual(account.account_id);
        }
    })
});