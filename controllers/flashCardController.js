import { getAllCards, saveCardStack } from "../models/flashCardModel.js";
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


// Returns all cards as JSON
export const getCards = async (req, res) => {
    try {
      const cards = await getAllCards();
      res.json(cards);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      res.status(500).json({ error: "Failed to fetch cards." });
    }
};
  