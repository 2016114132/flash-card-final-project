import { query } from "../config/db.js";

// Gets all cards from database and orders it by id
export const getAllCards = async () => {
  const result = await query("SELECT * FROM cards ORDER BY id ASC");
  return result.rows;
};

// Inserts a card to the database and returns updated card
export const addCardItem = async (front, back) => {
  const result = await query(
    "INSERT INTO cards (front, back) VALUES ($1, $2) RETURNING *",
    [front, back]
  );
  return result.rows[0];
};

// Updates a card in the database and returns updated card
export const updateCardItem = async (id, front, back) => {
  const result = await query(
    "UPDATE cards SET front = $1, back = $2 WHERE id = $3 RETURNING *",
    [front, back, id]
  );
  return result.rows[0];
};

// Deletes a card from the database
export const deleteCardItem = async (id) => {
  await query("DELETE FROM cards WHERE id = $1", [id]);
};
