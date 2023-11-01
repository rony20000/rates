import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [rates, setRate] = useState({})
  const [currency, setCurrency] = useState("EUR")
  const [date, setDate] = useState("2020-05-16")
  const [currencies, setCurrencies] = useState([])

  const [to, setTo] = useState("EUR")
  const [from, setFrom] = useState("USD")
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState()

  var myHeaders = new Headers();
  myHeaders.append("apikey", "ykPH8cZyTG6Ib9vxu7gE5a0wjjtYeDGG");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const [startDate, setStartDate] = useState("2022-05-14")
  const [endDate, setEndDate] = useState("2022-05-16")
  const [firstCurrency, setFirstCurrency] = useState("EUR")
  const [secondCurrency, setSecondCurrency] = useState("USD")
  const [history, setHisotry] = useState()


  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then(response => response.json())
    .then(result => setCurrencies(result.symbols))
    .catch(error => console.log('error', error))
  }, [])

  useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/${date}?symbols=${currency}&base=${currency}`, requestOptions)
    .then(response => response.json())
    .then(result => setRate(result.rates))
    .catch(error => console.log('error', error))
  },  [date, currency, currencies])

  useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => response.json())
    .then(result => setResult(result.result))
    .catch(error => console.log('error', error))
  },  [to, from, amount])

  useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDate}&end_date=${endDate}`, requestOptions)
    .then(response => response.json())
    .then(result => setHisotry(result.rates))
    .catch(error => console.log('error', error));
  },  [])

  const handleCurrencyChange = (currency) => {
    setCurrency(currency)
  }

  const handleDateChange = (date) => {
    setDate(date)
  }
  
  const handleToChange = (to) => {
    setTo(to)
  }
  
  const handleFromChange = (from) => {
    setFrom(from)
  }

  const handleAmountChange = (amount) => {
    setAmount(amount)
  }

  const handleFirstCurrencyChange = (currency) => {
    setFirstCurrency(currency)
  }

  const handleSecondCurrencyChange = (currency) => {
    setSecondCurrency(currency)
  }

  const handleStartDateChange = (startDate) => {
    setStartDate(startDate)
  }

  const handleEndDateChange = (endDate) => {
    setEndDate(amount)
  }

  return (
    <div className="App">
    <h2>Select a currency</h2>
    <select onChange={(event) => handleCurrencyChange(event.target.value)}>
       {
          currencies && Object.keys(currencies).map((key, index) => {
            return (
              <option key={key} value={key}>{key}</option>
            )
          })
          
        }
    </select>
    <h2>Select a date</h2>
    <input type="date" onChange={(event) => handleDateChange(event.target.value)}/>
      <h1>
        {`${date} rates  listings in ${currency}`}
      </h1>
      <ul>
        {
          rates && Object.keys(rates).map((key, index) => {
            return (
              <li key={key}>{key}: {rates[key]}</li>
            )
          })
          
        }
      </ul>

      <h2>Convert</h2>
      <p>From:</p>
      <select onChange={(event) => handleFromChange(event.target.value)}>
        {
            currencies && Object.keys(currencies).map((key, index) => {
              return (
                <option selected={key === from && "selected"}  key={key} value={key}>{key}</option>
              )
            })
            
          }
      </select>

      <p>To:</p>
      <select onChange={(event) => handleToChange(event.target.value)}>
        {
            currencies && Object.keys(currencies).map((key, index) => {
              return (
                <option selected={key === to && "selected"} key={key} value={key}>{key}</option>
              )
            })
            
          }
      </select>

      <p>amount:</p>
      <input type="number" value={amount} onChange={(event) => handleAmountChange(event.target.value)}/>

      <p>Result:</p>
      <h3>{result}</h3>


      <h2>Select start date</h2>
      <input type="date" onChange={(event) => handleStartDateChange(event.target.value)}/>

      <h2>Select end date</h2>
      <input type="date" onChange={(event) => handleEndDateChange(event.target.value)}/>

      <h2>Select first currency</h2>
      <select onChange={(event) => handleFirstCurrencyChange(event.target.value)}>
        {
            currencies && Object.keys(currencies).map((key, index) => {
              return (
                <option key={key} value={key}>{key}</option>
              )
            })
            
          }
      </select>

      <h2>Select second currency</h2>
      <select onChange={(event) => handleSecondCurrencyChange(event.target.value)}>
        {
            currencies && Object.keys(currencies).map((key, index) => {
              return (
                <option key={key} value={key}>{key}</option>
              )
            })
            
          }
      </select>

      <p>History:</p>
      {
        history && Object.keys(history).map((key, index) => {
          return (
            <div>{key}: 
              <p>{history[key][firstCurrency]}</p>
              <p>{history[key][secondCurrency]}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
