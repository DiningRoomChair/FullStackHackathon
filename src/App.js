import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';
import Films from './Components/films';
import People from './Components/people';
import Planets from './Components/planets';
import Species from './Components/species';
import Starships from './Components/starships';
import Vehicles from './Components/vehicles';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleFilmsClick = this.handleFilmsClick.bind(this);
    this.handlePeopleClick = this.handlePeopleClick.bind(this);
    this.handlePlanetsClick = this.handlePlanetsClick.bind(this);
    this.handleSpeciesClick = this.handleSpeciesClick.bind(this);
    this.handleStarshipsClick = this.handleStarshipsClick.bind(this);
    this.handleVehiclesClick = this.handleVehiclesClick.bind(this);
  }

  state = {
    subject: ""
  }

  handleFilmsClick(){
    this.setState({subject: "films"});
  }
  handlePeopleClick(){
    this.setState({subject: "people"});
  }
  handlePlanetsClick(){
    this.setState({subject: "planets"});
  }
  handleSpeciesClick(){
    this.setState({subject: "species"})
  }
  handleStarshipsClick(){
    this.setState({subject: "starships"})
  }
  handleVehiclesClick(){
    this.setState({subject: "vehicles"})
  }

  render() {
    let table;
    switch(this.state.subject){
      case "films":
        table = <Films />;
        break;
      case "people":
        table = <People />;
        break;
      case "planets":
        table = <Planets />;
        break;
      case "species":
        table = <Species />;
        break;
      case "starships":
        table = <Starships />
        break;
      case "vehicles":
        table = <Vehicles />
        break;
      default:
        table = <h3 className="display">Pick a topic from the links at the top of your screen 
          to see information about it.</h3>
    }
    return (
      <div>
        <ul className="nav nav-tabs nav-justified fixed-top">
          <li className="nav-item" onClick={this.handleFilmsClick}>
            <a className="nav-link" href="#">Films</a>
          </li>
          <li className="nav-item" onClick={this.handlePeopleClick}>
            <a className="nav-link" href="#">People</a>
          </li>
          <li className="nav-item" onClick={this.handlePlanetsClick}>
            <a className="nav-link" href="#">Planets</a>
          </li>
          <li className="nav-item" onClick={this.handleSpeciesClick}>
            <a className="nav-link" href="#">Species</a>
          </li>
          <li className="nav-item" onClick={this.handleStarshipsClick}>
            <a className="nav-link" href="#">Starships</a>
          </li>
          <li className="nav-item" onClick={this.handleVehiclesClick}>
            <a className="nav-link" href="#">Vehicles</a>
          </li>
        </ul>
        <h1 className="display-2"><strong>Star Wars Search</strong></h1>
        <hr></hr>
        {table}
      </div>
    );
  }
}

export default App;
