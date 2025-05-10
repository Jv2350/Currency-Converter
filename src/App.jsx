import React, { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { ArrowUpDownIcon } from "lucide-react";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setAmount(convertedAmount.toString());
    setConvertedAmount(0);
  };

  const convertCurrency = () => {
    if (!amount || isNaN(amount)) return;
    const numericAmount = parseFloat(amount);
    const result = numericAmount * currencyInfo[to];
    setConvertedAmount(result.toFixed(2));
  };

  const backgroundImage = "https://wallpapercave.com/wp/wp4113144.jpg";

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convertCurrency();
          }}
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-lg">
            Currency Converter
          </h1>

          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectCurrency={from}
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={swapCurrencies}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300"
            >
              <ArrowUpDownIcon size={20} />
            </button>
          </div>

          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>

          {convertedAmount > 0 && (
            <p className="text-center text-white mt-6 text-lg font-semibold drop-shadow">
              {amount} {from.toUpperCase()} = {convertedAmount}{" "}
              {to.toUpperCase()}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
