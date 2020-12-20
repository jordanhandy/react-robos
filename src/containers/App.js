// import deconstructed { Component } from 'react'
// Import hooks useState, and useEffect
import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
// Error Boundary introduced in React 16
import ErrorBoundry from "./ErrorBoundary";
import "./App.css";

// Basic construct of State in react
// Your App extends the Component class

// Use a constructor do declare the state.
// Within the state object, you define the items
// that can change as a part of state

// In this case, it is the robots data file, and the
// search field acting on that data file
function App() {
  const [robots, setRobots] = useState([])
  const [searchfield, setSearchField] = useState("");
  // use useEffect to run when the app loads, to grab robot data

  // JSON-formatted response is returned, then this is set as the new state of the 'robots' prop

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        setRobots(users)
      });
  }, [])
  // run initially only when the component mounts

  // the function action on state.
  // You need to use the functionName = (params) => { syntax so that when you call 'this', the app
  // knows that you are referring to the parent, and not the event in question, sent as params
  const onSearchChange = (event) => {
    // set the state of the searchfield to equal that of the value being typed into the searchfield
    setSearchField(event.target.value);
  };
  // your constant then becomes a filtered list of robots, based on what is put into the searchfield
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  // ternary operator.  If robots.length is equal to 0, display "Loading..."
  // if not, display the robots
  return !robots.length ? (
    <h1>Loading...</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      {/* the onSearchChange prop is sent to the searchBox */}
      <SearchBox searchChange={onSearchChange} />
      {/* instead of a constant list of 10 robots, you then set the value of robots to be the list of filteredRobots */}
      {/* Wrap our card list in the Error Boundary to catch if anything went wrong */}
      <ErrorBoundry>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </ErrorBoundry>
    </div>
  );
}
export default App;
