import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dropdown({ props }) {
  const [list, setList] = useState([]);
  // const backupAPIKey1 = "UCEMV198VHIAR9G7";  In case the main one isnt working

  useEffect(() => {
    findingOptions();
  }, [props]);

  const getStock = async (stock) => {
    console.log("getting Stock");
    window.location = `/${stock}`;
  };

  const findDynamicOptions = async (ticker) => {
    console.log(ticker);
    const functionType = "SYMBOL_SEARCH";
    const keywords = ticker.toUpperCase();
    const url = `https://www.alphavantage.co/query?function=${functionType}&keywords=${keywords}&apikey=${process.env.API_KEY}`;

    try {
      const response = await axios(url);
      const output = response.data.bestMatches.map(
        (ticker) => ticker["1. symbol"]
      );
      if (output) {
        console.log("logging response: " + response);
        // alert(JSON.stringify(response));
        console.log("output: ");
        return output;
      }
    } catch (error) {
      console.log("Nothing Found Innit Sorry Bruv");
      console.log(error);
      return [];
    }
  };

  const renderDropdown = (elements) => {
    const items = [];
    console.log("elements: " + elements);
    for (const [index, value] of elements.entries()) {
      let valueNotEmpty = value !== "";
      items.push(
        valueNotEmpty && (
          <li
            key={index}
            onClick={function () {
              getStock(value);
            }}
          >
            {value}
          </li>
        )
      );
    }
    return items;
  };

  const findingOptions = () => {
    findDynamicOptions(props).then((resp) => {
      setList(renderDropdown(resp));
    });
  };

  return <div>{list}</div>;
}
