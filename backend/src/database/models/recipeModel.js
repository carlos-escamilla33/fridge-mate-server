const {pool} = require("../config/database");

const createRecipe = async ({account_id, recipe_name, ingredients, instructions, based_on_items}) =>{
    try {
        const {rows: [recipe]} = await pool.query(
            `
            INSERT INTO recipe(account_id, recipe_name, ingredients, instructions, based_on_items)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *; 
            `,
            [account_id, recipe_name, ingredients, instructions, based_on_items]
        );

        return recipe;
    } catch (err) {
        throw err;
    }
}

const findRecipeById = async (id) => {
    try {
        const {rows: [recipe]} = await pool.query(
            `
            SELECT * FROM recipe
            WHERE recipe_id=$1;
            `,
            [id]
        );

        return recipe;
    } catch (err) {
        throw err;
    }
}

const findRecipesByAccountId = async (account_id) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM recipe
            WHERE account_id=$1;
            `,
            [account_id]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

// const findAvailableRecipes = async (account_id) => {
//     try {
//         const {rows} = await pool.query(
//             `
//             SELECT * FROM recipe
//             WHERE account_id=$1;
//             `,
//             [account_id]
//         );

//         return rows;
//     } catch (err) {
//         throw err;
//     }
// }

const updateRecipe = async ({recipe_id, recipe_name, ingredients, instructions, based_on_items}) => {
    try {
        const {rows: [recipe]} = await pool.query(
            `
            UPDATE recipe
            SET recipe_name=$1, ingredients=$2, instructions=$3, based_on_items=$4
            WHERE recipe_id=$5
            RETURNING *;
            `,
            [recipe_name, ingredients, instructions, based_on_items, recipe_id]
        );
        
        return recipe;
    } catch (err) {
        throw err;
    }
}

const deleteRecipe = async (id) => {
    try {
        const {rows: [recipe]} = await pool.query(
            `
            DELETE FROM recipe
            WHERE recipe_id=$1
            RETURNING *;
            `,
            [id]
        );

        return recipe;
    } catch (err) {
        throw err;
    }
}

const searchRecipeByName = async (recipe_name) => {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM recipe
            WHERE recipe_name=$1;
            `,
            [recipe_name]
        );

        return rows;
    } catch (err) {
        throw err;
    }
}

const searchRecipeByIngredient = async ({account_id, ingredient}) => {
    try {
        const {rows: [recipe]} = await pool.query(
            `
            SELECT * FROM recipe
            WHERE account_id=$1
            AND ingredients ILIKE '%' || $2 || '%';
            `,
            [account_id, ingredient]
        );

        return recipe;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createRecipe,
    findRecipeById,
    findRecipesByAccountId,
    updateRecipe,
    deleteRecipe,
    searchRecipeByName,
    searchRecipeByIngredient
}