import { 
    getAllCards, 
    saveCardStack,
    addCardItem,
    updateCardItem,
    deleteCardItem 

} from "../models/flashCardModel.js";
const appTitle = "Flash Card App";

export const getHome = async (req, res) => {

    try{  
        const cards = await getAllCards();

        res.render("flashCard", {
            title: appTitle,
            pageID: "home",
            cards
        });
    }catch(error){
        res.status(500).send('An error occurred while loading flash cards.');
    }    
    
};

export const getEditStack = async (req, res) => {

    try{  
        const cards = await getAllCards();

        res.render("editStack", {
            title: appTitle,
            pageID: "edit",
            cards
        });
    }catch(error){
        res.status(500).send("An error occurred while loading the edit page.");
    }    
    
};

export const postSaveStack = async (req, res) => {
    try {
      const cards = req.body.cards || [];
      
      await saveCardStack(cards);

      res.redirect("/edit"); 
    } catch (error) {
      console.error("Error saving cards:", error);
      res.status(500).send("Failed to save card stack.");
    }
};


// GET - Returns all cards as JSON
export const getCards = async (req, res) => {
    try {
      const cards = await getAllCards();
      res.json(cards);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      res.status(500).json({ error: "Failed to fetch cards." });
    }
};
  
// POST
export const addCard = async (req, res) => {
  try {
    const { front, back } = req.body;

    if (!front || !back) {
      return res.status(400).json({ error: "Term and definition are required." });
    }

    const newCard = await addCardItem(front, back);
    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ error: "Failed to add card." });
  }
};

// PUT
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { front, back } = req.body;

    if (!front?.trim() || !back?.trim()) {
      return res.status(400).json({ error: "Term and definition are required." });
    }

    const updated = await updateCardItem(id, front, back);
    res.json(updated);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card." });
  }
};

// DELETE
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCardItem(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card." });
  }
};