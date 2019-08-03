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

    for (var i = 0; i < jsonData.length; i++) {
      var tr = document.createElement("tr");
      
      for (var key in jsonData[i]) {
        if(Array.isArray(jsonData[i][key])){
          for (var j = 0; j < jsonData[i][key].length; j++) {
            var td = document.createElement("td");
            var txt = document.createTextNode(jsonData[i][key][j]);
            td.appendChild(txt);
            tr.appendChild(td);
          }
        }else{
          var td = document.createElement("td");
          var txt = document.createTextNode(jsonData[i][key]);
          td.appendChild(txt);
          tr.appendChild(td);
        }
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
  return (
    <div>
      <div className="buttonBox">
        {lastPage()}
        {nextPage()}
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