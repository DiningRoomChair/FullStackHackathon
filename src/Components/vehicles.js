import React, { Component } from 'react'
import axios from 'axios';

export default class Vehicles extends Component {

  state = {
    vehicles: []
  };

  getVehicles = async function(len){
    var vehicles = [];
    for(var i = 1; i <= len; i++){
      vehicles.push(axios.get(`https://swapi.co/api/vehicles/${i}/?format=json`)
                    .catch(err => console.warn(err))
      );
    }
    Promise.all(vehicles).then( (response) => {
      let vehicleList = [];
      response.map(res => {
        if(res !== undefined){
          vehicleList.push(res.data);
        }
      })
      this.setState({vehicles: vehicleList});
    })
  }

  componentWillMount = () => {
    axios.get(`https://swapi.co/api/vehicles/?format=json`)
      .then( ({data}) => {
        this.getVehicles(data.count);
      })
      .catch(err => console.warn(err))
  }

  renderVehicles = () => {
    let vehicles = this.state.vehicles.map(vehicle =>
      <tr>
        <td>{vehicle.name}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.manufacturer}</td>
        <td>{vehicle.cost_in_credits}</td>
        <td>{vehicle.length}</td>
        <td>{vehicle.max_atmosphering_speed}</td>
        <td>{vehicle.crew}</td>
        <td>{vehicle.passengers}</td>
        <td>{vehicle.cargo_capacity}</td>
        <td>{vehicle.consumables}</td>
        <td>{vehicle.vehicle_class}</td>
      </tr>
    )
    return(vehicles)
  }

  render() {
    return (
      <div>
        <h2 className="display-4"><strong>Vehicles</strong></h2>
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
            <th>Vehicle Class</th>
          </tr>
          {this.renderVehicles()}
        </table>
      </div>
    )
  }
}
