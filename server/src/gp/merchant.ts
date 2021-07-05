import express from 'express';
let merchant:any = express.Router();
/**
 * Gratify Merchant endpoints
 * 
 */
merchant.get("/", (_:any, res:any) => {
    
    return res.json({"data": "hi"})
})

module.exports = merchant;