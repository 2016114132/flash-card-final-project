import { query } from "../config/db.js";

export const getAllCards = async () => {
  const result = await query("SELECT * FROM cards ORDER BY id ASC");
  return result.rows;
};

export const saveCardStack = async (cards) => {
  await query("DELETE FROM cards");
  for (const card of cards) {
    await query(
      "INSERT INTO cards (front, back) VALUES ($1, $2)",
      [card.front, card.back]
    );
  }
};

export const addCardItem = async (front, back) => {
  const result = await query(
    "INSERT INTO cards (front, back) VALUES ($1, $2) RETURNING *",
    [front, back]
  );
  return result.rows[0];
};

export const updateCardItem = async (id, front, back) => {
  const result = await query(
    "UPDATE cards SET front = $1, back = $2 WHERE id = $3 RETURNING *",
    [front, back, id]
  );
  return result.rows[0];
};

export const deleteCardItem = async (id) => {
  await query("DELETE FROM cards WHERE id = $1", [id]);
};
