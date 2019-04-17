import React, { Component } from 'react'
import axios from 'axios';

export default class Species extends Component {

  state = {
    species: []
  };

  getSpecies = async function(len){
    var species = [];
    for(var i = 1; i <= len; i++){
      species.push(axios.get(`https://swapi.co/api/species/${i}/?format=json`)
                    .catch(err => console.warn(err))
      );
    }
    Promise.all(species).then( (response) => {
      let speciesList = [];
      response.map(res => {
        if(res !== undefined){
          speciesList.push(res.data);
        }
      })
      this.setState({species: speciesList});
    })
  }

componentDidMount = () => {
    axios.get(`https://swapi.co/api/species/?format=json`)
      .then( ({data}) => {
        this.getSpecies(data.count);
      })
      .catch(err => console.warn(err))
  }

  renderSpecies = () => {
    let species = this.state.species.map(species =>
      <tr>
        <td>{species.name}</td>
        <td>{species.classification}</td>
        <td>{species.designation}</td>
        <td>{species.average_height}</td>
        <td>{species.skin_colors}</td>
        <td>{species.hair_colors}</td>
        <td>{species.eye_colors}</td>
        <td>{species.average_lifespan}</td>
        <td>{species.language}</td>
      </tr>
    )
    return(species)
  }

  render() {
    return (
      <div>
        <h2 className="display-4"><strong>Species</strong></h2>
        <table className="table table-dark">
          <tr>
            <th>Name</th>
            <th>Classification</th>
            <th>Designation</th>
            <th>Average Height</th>
            <th>Skin Colors</th>
            <th>Hair Colors</th>
            <th>Eye Colors</th>
            <th>Average Lifespan</th>
            <th>Language</th>
          </tr>
          {this.renderSpecies()}
        </table>
      </div>
    )
  }
}
