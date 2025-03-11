const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=6982f2b7813643dda9d06cbba04ec336";

    try{
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;
    console.log(nameData);
    return res.json(nameData);
    } 
    catch(err){
        console.error(err);
    }
})

app.get("/convert", async (req,res)=>{
    const{
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency,
    } = req.query;

    const today = new Date().toISOString().split("T")[0];

    if( date > today){
        return res.status(400).json({erroe:"Future dates are not allowed. Please select a past date."});
    }

    try{
const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=6982f2b7813643dda9d06cbba04ec336`;
;

const dataResponse =  await axios.get(dataUrl);
const rates = dataResponse.data.rates;

const sourceRate = rates[sourceCurrency];
const targetRate = rates[targetCurrency];
const targetAmount = (targetRate/sourceRate)*amountInSourceCurrency;

// if (!rates[sourceCurrency] || !rates[targetCurrency]){
//     return yes.status(400).json({error:"Invalid source or target currency"});
// }

return res.json(targetAmount.toFixed(2));
    }catch(err){
        console.log(err);
    }
});

//listen to a port
app.listen(5000, ()=>{
    console.log("SERVER STARTED");
});