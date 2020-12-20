// import deconstructed { Component } from 'react'
import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import Scroll from "./Scroll";
import "./App.css";

// Basic construct of State in react
// Your App extends the Component class

// Use a constructor do declare the state.
// Within the state object, you define the items
// that can change as a part of state

// In this case, it is the robots data file, and the
// search field acting on that data file
class App extends Component {
  // call the base class
  // call super
  constructor() {
    super();
    // define the 'state' object
    this.state = {
      robots: [],
      searchfield: "",
    };
  }
  // use React lifecycle method to call componentDidMount() and create a GET
  // request to an API endpoint.  This endpoint holds the data we need, so the static
  // robots.txt data file is not needed

  // JSON-formatted response is returned, then this is set as the new state of the 'robots' prop
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  // the function action on state.
  // You need to use the functionName = (params) => { syntax so that when you call 'this', the app
  // knows that you are referring to the parent, and not the event in question, sent as params
  onSearchChange = (event) => {
    // set the state of the searchfield to equal that of the value being typed into the searchfield
    this.setState({ searchfield: event.target.value });
  };

  render() {
    // your constant then becomes a filtered list of robots, based on what is put into the searchfield
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          {/* the onSearchChange prop is sent to the searchBox */}
          <SearchBox searchChange={this.onSearchChange} />
          {/* instead of a constant list of 10 robots, you then set the value of robots to be the list of filteredRobots */}
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}
export default App;
