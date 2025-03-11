import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [hasResult, setHasResult] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      if(response.data && response.data>0){
        setAmountInTargetCurrency(response.data);
        setHasResult(true);
      }else{
        setHasResult(false);
      }
      setShowResult(true);
    } catch (err) {
      console.log(err);
      setHasResult(false);
      setShowResult(true);
    }
    console.log(date, sourceCurrency, targetCurrency, amountInSourceCurrency);
  };

  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 id="heading" className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Currencies Today & past
      </h1>

      <div className="mt-5 flex items-center justify-center flex-column">
        <section className="w-full lg:w-1/2">
        {!showResult?(
          <form onSubmit={handleSubmit}>{/* 🟢 Show form */}
            {/* Form Fields */}
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="Date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                //required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                type="text"
                id={sourceCurrency}
                name={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                //required
              >
                <option value="">Select Source Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
               Source Currency Amount
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="text"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                placeholder="Enter Amount in source currency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                //required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                type="text"
                id={targetCurrency}
                name={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                //required
              >
                <option value="">Select Target Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <button id="button" className=" text-white font-bold py-2 px-4 rounded-md ">
              {""} Get the target
            </button>
          </form>
          ): hasResult? (
            <div>
            <h4 id="output" className="text-3xl">
            {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {""} {amountInTargetCurrency} in {currencyNames[targetCurrency]}
          </h4>
          
        <button id="button" onClick={()=>{
          setShowResult(false);
          setAmountInTargetCurrency(null);
        }} className="mt-4 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">Convert Again</button>
        </div>
      ):(
          <div className="text-center p-5 bg-red-100 rounded-lg shadow-md">
          <h3 id="output1" className="text-2xl">
            Conversion failed! Please check the values and try again. Future dates are not allowed. Please select a past date.
          </h3>

          <button id="button1"
            onClick={() => setShowResult(false)}
            className="mt-4 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
        )
      }
        </section>
      </div>
    </div>
  );
}

export default App;
