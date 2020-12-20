// import deconstructed { Component } from 'react'
import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from './SearchBox';
import { robots } from "./robots";
import './App.css'

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
  constructor(){
    super()
    // define the 'state' object
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }

  // the function action on state.
  // You need to use the functionName = (params) => { syntax so that when you call 'this', the app
  // knows that you are referring to the parent, and not the event in question, sent as params
  onSearchChange = (event) => {
    // set the state of the searchfield to equal that of the value being typed into the searchfield
    this.setState({searchfield: event.target.value})
  }

  render() {
    // your constant then becomes a filtered list of robots, based on what is put into the searchfield
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
    <div className="tc">
    <h1 className="f1">RoboFriends</h1>
    {/* the onSearchChange prop is sent to the searchBox */}
    <SearchBox searchChange={this.onSearchChange} />
    {/* instead of a constant list of 10 robots, you then set the value of robots to be the list of filteredRobots */}
   <CardList robots={filteredRobots} />
   </div>
    );
  }
}
export default App;
