import React, { Component } from 'react'
import axios from 'axios';

export default class Planets extends Component {

  state = {
    planets: []
  };

  getPlanets = async function(len){
    var planets = [];
    for(var i = 1; i <= len; i++){
      planets.push(axios.get(`https://swapi.co/api/planets/${i}/?format=json`)
                    .catch(err => console.warn(err))
      );
    }
    Promise.all(planets).then( (response) => {
      let planetList = [];
      response.map(res => {
        if(res !== undefined){
          planetList.push(res.data);
        }
      })
      this.setState({planets: planetList});
    })
  }

  componentWillMount = () => {
    axios.get(`https://swapi.co/api/planets/?format=json`)
      .then( ({data}) => {
        this.getPlanets(data.count);
      })
      .catch(err => console.warn(err))
  }

  renderPlanets = () => {
    let planets = this.state.planets.map(planet =>
      <tr>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
      </tr>
    )
    return(planets)
  }

  render() {
    return (
      <div>
        <h2 className="display-4"><strong>Planets</strong></h2>
        <table className="table table-dark">
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
          </tr>
          {this.renderPlanets()}
        </table>
      </div>
    )
  }
}
