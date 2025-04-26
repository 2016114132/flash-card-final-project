import { 
    getAllCards, 
    // saveCardStack,
    addCardItem,
    updateCardItem,
    deleteCardItem 

} from "../models/flashCardModel.js";
const appTitle = "Flash Card App";

// Shows the home screen
export const getHome = async (req, res) => {

    try{  
        // Get all cards to show on the page
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

// Shows the edit screen
export const getEditStack = async (req, res) => {

    try{  
        // Get all cards to show on the page
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
  
// POST - Adds a card
export const addCard = async (req, res) => {
  try {
    const { front, back } = req.body;

    // Validate input
    if (!front || !back) {
      return res.status(400).json({ error: "Term and definition are required." });
    }

    const newCard = await addCardItem(front, back);
    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ error: error.message });
  }
};

// PUT - Updates a card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { front, back } = req.body;

    // Validate input
    if (!front || !back) {
      return res.status(400).json({ error: "Term and definition are required." });
    }

    const updated = await updateCardItem(id, front, back);
    res.json(updated);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card." });
  }
};

// DELETE - Removes a card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    
    await deleteCardItem(id);
    res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card." });
  }
};