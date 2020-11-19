import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export const AutoComplete = () => {
    
    const findDynamicOptions = async(ticker) => {
        const functionType = 'SYMBOL_SEARCH'
        const keywords = ticker.toUpperCase()
        const interval = '30min'
        let tickerArrOptions = []
        let ticketArrCounter = 0

        const url = `https://www.alphavantage.co/query?function=${functionType}&keywords=${keywords}&apikey=${process.env.API_KEY}`
        try {
            const response = await axios(url)
            const JsonReponse = response.json()
            //Add the console.log to test JSON Queries
            //Feed those queries to ticketArrOptions and pass that final array to getStock()
            let obj = JSON.parse(JsonReponse);
            var arr = [ {"id":"10", "class": "child-of-9"}, {"id":"11", "classd": "child-of-10"}];

            for (let i = 0; i < arr.length; i++){
                let obj = arr[i];
                for (let key in obj){
                    let attrName = key;
                    let attrValue = obj[key];
                }
            }


            /*
                {
    "bestMatches": [
        {
            "1. symbol": "BA",
            "2. name": "The Boeing Company",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-05",
            "8. currency": "USD",
            "9. matchScore": "1.0000"
        },
        {
            "1. symbol": "BAC",
            "2. name": "Bank of America Corporation",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-05",
            "8. currency": "USD",
            "9. matchScore": "0.8000"
        },
            */






        } catch (err) {
            console.log("Nothing Found Innit Sorry Bruv")
            return ["EMPTY"]
        }

        
    }

  const state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };

  const parsedOptions = JSON.parse(JSONoptions);
  console.log(parsedOptions);
  const tickerOptions = parsedOptions.bestMatches

  onChange = (e) => {
    console.log('onChanges');

    const { options } = findDynamicOptions(e.currentTarget.value);
    const userInput = e.currentTarget.value;
// TO DO: Add a way to let options take in the JSON data and filter for stock names then apply the filteredOptions()

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toUpperCase().indexOf(userInput.toUpperCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  async function getStock(symbol) {
    symbol.toUpperCase()
    window.location = `/${symbol}`
}
  
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
         <label>Type a Stock Ticker</label>
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button type="submit" className="search-btn" onClick={getStock(userInput)}></button>
        </div>
        {optionList}
      </React.Fragment>
    );
  }

export default AutoComplete;
