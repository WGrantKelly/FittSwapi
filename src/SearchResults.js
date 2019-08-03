import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { JsonToTable } from "react-json-to-table"; 
import swapiModule from "./swapi";
import './styles.css';


function SearchResults(props) {
  const [ jsonData, setJsonData ] = useState([]);
  const [resultsReturned, setResultsReturned] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    console.log("current state of json: ", jsonData);
    swapiModule.getPeople({page: pageNumber, search: props.strang}, function(data) {
        console.log("All results that match ", props.strang, " ", data);
        setResultsReturned(data.results.length)
        setJsonData(data.results);
      });
  }, [props, pageNumber]);

  function displayTable() {
    console.log("json data: ", jsonData);
    var tab = document.getElementById("searchResultsTable");
    if(tab!=null){
      while (tab.firstChild) {
        tab.removeChild(tab.firstChild);
      }
    }
    console.log("tab: ", tab);

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
    

    for (var i = 0; i < jsonData.length; i++) {
        tr = document.createElement("tr");
      
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
  function incrementPageNumber(){
    setPageNumber(pageNumber+1)
  }
  function decrementPageNumber(){
    setPageNumber(pageNumber-1)
  }
  function nextPage(){
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
    if(pageNumber>1){
      console.log("result of search yielded ten results!")
      return(
        <div>
          <button type="submit" value="Previous Page" onClick={decrementPageNumber}>Previous Page</button>
        </div>
      );
    }
  }
  
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

  function sortWrapper(){
    // if(jsonData.length>0){
      return(
        <div className="buttonBox">
          <div>
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
