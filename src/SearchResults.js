import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { JsonToTable } from "react-json-to-table"; 
import swapiModule from "./swapi";
import './styles.css';

//function is called on the button click of the search form
function SearchResults(props) {

  //set stateful variables for the json data, what page of the data we are on, and the number of results returned from the fetch so that we know what buttoins to render
  const [ jsonData, setJsonData ] = useState([]);
  const [resultsReturned, setResultsReturned] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  //the side effect of the Search Results function call. Gets called when a dependency updates or just simply at the first call of the component (like didMount)
  useEffect(() => {
    console.log("current state of json: ", jsonData);
    swapiModule.getPeople({page: pageNumber, search: props.strang}, function(data) {
        console.log("All results that match ", props.strang, " ", data);
        setResultsReturned(data.results.length)
        setJsonData(data.results);
      });
      //adding props and pageNumbers as dependencies causes this effect function to fire on a state change for these values
  }, [props, pageNumber]);

  //iterate through the results stored in the state and render them to the screen
  function displayTable() {
    console.log("json data: ", jsonData);
    var tab = document.getElementById("searchResultsTable");
    //if the table is not null, clear it to avoid redundancy in the table
    if(tab!=null){
      while (tab.firstChild) {
        tab.removeChild(tab.firstChild);
      }
    }
    console.log("tab: ", tab);

    //render the column headers
    var tr = document.createElement("tr");
    if(tab!=null && jsonData!=null){
      for (var key in jsonData[0]) {
        var td = document.createElement("td");
        var txt = document.createTextNode(key);
        td.appendChild(txt);
        tr.appendChild(td);
      }
      tab.appendChild(tr);
    }
    
    //for every record returned in json, create a row in the table
    for (var i = 0; i < jsonData.length; i++) {
        tr = document.createElement("tr");
      
        //for every record, return its value. Check to see if it is an array, and if it is, return all of the values in that array in the one cell
      for (var key in jsonData[i]) {
        var td = document.createElement("td");
        if(Array.isArray(jsonData[i][key])){
          for (var j = 0; j < jsonData[i][key].length; j++) {
            var txt = document.createTextNode(" " + jsonData[i][key][j]);
            td.appendChild(txt);
          }
        }else{
          var txt = document.createTextNode(jsonData[i][key]);
          td.appendChild(txt);
        }
        tr.appendChild(td);
      }
      tab.append(tr);
    }

  }
  //these two functions maintain the proper state of the pageNumber 
  function incrementPageNumber(){
    setPageNumber(pageNumber+1)
  }
  function decrementPageNumber(){
    setPageNumber(pageNumber-1)
  }

  //render nextpage and lastpage buttons as long as the data permits it ...
  function nextPage(){
    //if the result rendered ten items, then there may be a next page, make the next page button appear
      if(resultsReturned==10){
        console.log("result of search yielded ten results!")
        return(
          <div>
            <button type="submit" value="Next Page" onClick={incrementPageNumber}>Next Page</button>
          </div>
        );
      }
  }
  function lastPage(){
    //if the pageNumber is greater than one, we can go backwards. Render the button.
    if(pageNumber>1){
      console.log("result of search yielded ten results!")
      return(
        <div>
          <button type="submit" value="Previous Page" onClick={decrementPageNumber}>Previous Page</button>
        </div>
      );
    }
  }
  
  //create a sorting function that replaces the state of the data in the component with sorted data, and then re-renders the table to the screen sorted by eye color
  function sortByEyeColor(){
    console.log("sorting by eye color")
    let tempdata = jsonData;
    tempdata = tempdata.sort(function(a,b){
      if(a["eye_color"] == b["eye_color"])
          return 0;
      if(a["eye_color"] < b["eye_color"])
          return -1;
      if(a["eye_color"] > b["eye_color"])
          return 1;
    });
    setJsonData(tempdata);
    console.log("TEMP JSON: ", tempdata);
    console.log("JSON: ", jsonData);
    displayTable()
      
    
  }

  //create a sorting function that replaces the state of the data in the component with sorted data, and then re-renders the table to the screen sorted by mass
  function sortByMass(){
    console.log("sorting by mass")
    let tempdata = jsonData;
    tempdata = tempdata.sort(function(a,b){
      if(a["mass"] == b["mass"])
          return 0;
      if(a["mass"] < b["mass"])
          return -1;
      if(a["mass"] > b["mass"])
          return 1;
    });
    setJsonData(tempdata);
    console.log("TEMP JSON: ", tempdata);
    console.log("JSON: ", jsonData);
    displayTable()
      
    
  }

  //create a sorting function that replaces the state of the data in the component with sorted data, and then re-renders the table to the screen sorted by gender
  function sortByGender(){
    console.log("sorting by gender")
    let tempdata = jsonData;
    tempdata = tempdata.sort(function(a,b){
      if(a["gender"] == b["gender"])
          return 0;
      if(a["gender"] < b["gender"])
          return -1;
      if(a["gender"] > b["gender"])
          return 1;
    });
    setJsonData(tempdata);
    console.log("TEMP JSON: ", tempdata);
    console.log("JSON: ", jsonData);
    displayTable()
     
  }

  //this function acts as a hub for the sorting buttons
  function sortWrapper(){
    // if(jsonData.length>0){
      return(
        <div className="buttonBox">
          <div>
            Sort By: 
          </div>
          <div >
            <button type="submit" value="eye color" onClick={sortByEyeColor}>Eye Color</button>
          </div>
          <div>
            <button type="submit" value="Mass" onClick={sortByMass}>Mass</button>
          </div>
          <div>
            <button type="submit" value="Gender" onClick={sortByGender}>Gender</button>
          </div>
        </div>
      );
    // }
      
  }

  //these functions are just for fun, but they are a cool graphical representation of the screen re-rendering
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function setRandomColor() {
    if(document.getElementById("randoColorItem1")!=null){
      document.getElementById("randoColorItem1").style.backgroundColor = getRandomColor();
    document.getElementById("randoColorItem2").style.backgroundColor = getRandomColor();
    document.getElementById("randoColorItem3").style.backgroundColor = getRandomColor();
  
    }
  }

  //render all of the functionality above
  return (
    <div>
      <div className="randoColorBox">
        <div id="randoColorItem1">

        </div>
        <div id="randoColorItem2">

        </div>
        <div id="randoColorItem3">

        </div>

      </div>
      <div>
        {setRandomColor()}
      </div>
      <div className="buttonBox">
        {lastPage()}
        {nextPage()}
      </div>
      <div>
        {sortWrapper()}
      </div>
      <table id="searchResultsTable">
      </table>
      <div>
        {displayTable()}
      </div>
    </div>   
  );
}
export default SearchResults;
