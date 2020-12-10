import React, { Component } from 'react'
import axios from 'axios';

export default class Starships extends Component {

  state = {
    starships: []
  };

  getStarships = async function(len){
    var starships = [];
    for(var i = 1; i <= len; i++){
      starships.push(axios.get(`https://swapi.dev/api/starships/${i}`)
                    .catch(err => console.warn(err))
      );
    }
    Promise.all(starships).then( (response) => {
      let starshipList = [];
      response.map(res => {
        if(res !== undefined){
          starshipList.push(res.data);
        }
      })
      this.setState({starships: starshipList});
    })
  }

componentDidMount = () => {
    axios.get(`https://swapi.dev/api/starships`)
      .then( ({data}) => {
        this.getStarships(data.count);
      })
      .catch(err => console.warn(err))
  }

  renderStarships = () => {
    let starships = this.state.starships.map(starship =>
      <tr>
        <td>{starship.name}</td>
        <td>{starship.model}</td>
        <td>{starship.manufacturer}</td>
        <td>{starship.cost_in_credits}</td>
        <td>{starship.length}</td>
        <td>{starship.max_atmosphering_speed}</td>
        <td>{starship.crew}</td>
        <td>{starship.passengers}</td>
        <td>{starship.cargo_capacity}</td>
        <td>{starship.consumables}</td>
        <td>{starship.hyperdrive_rating}</td>
        <td>{starship.MGLT}</td>
        <td>{starship.starship_class}</td>
      </tr>
    )
    return(starships)
  }

  render() {
    return (
      <div>
        <h2 className="display-4"><strong>Starships</strong></h2>
        <table className="table table-dark">
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost in Credits</th>
            <th>Length</th>
            <th>Max Atmosphering Speed</th>
            <th>Crew</th>
            <th>Passengers</th>
            <th>Cargo Capacity</th>
            <th>Consumables</th>
            <th>Hyperdrive Rating</th>
            <th>MGLT</th>
            <th>Starship Class</th>
          </tr>
          {this.renderStarships()}
        </table>
      </div>
    )
  }
}
