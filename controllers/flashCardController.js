import {  }  from "../models/flashCardModel.js";
const appTitle = "Flash Card App";

export const getHome = async (req, res) => {

    try{  
        res.render("flashCard", {
            title: appTitle,
        });
    }catch(error){
        res.status(500).send('An error occurred while loading flash cards.');
    }    
    
};

export const getEditStack = async (req, res) => {

    try{  
        res.render("editStack", {
            title: appTitle,
        });
    }catch(error){
        res.status(500).send('An error occurred while loading flash cards.');
    }    
    
};