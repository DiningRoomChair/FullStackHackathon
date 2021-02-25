import React, { Component } from 'react'
import axios from 'axios';

export default class People extends Component {

  state = {
    people: []
  };

  getPeople = async function(len){
    var people = [];
    for(var i = 1; i <= len; i++){
      people.push(axios.get(`https://swapi.dev/api/people/${i}/`)
                    .catch(err => console.warn(err))
      );
    }
    Promise.all(people).then( (response) => {
      let personList = [];
      response.map(res => {
        if(res !== undefined){
          personList.push(res.data);
        }
      })
      this.setState({people: personList});
    })
  }

componentDidMount = () => {
    axios.get(`https://swapi.dev/api/people/`)
      .then( ({data}) => {
        this.getPeople(data.count);
      })
      .catch(err => console.warn(err))
  }

  renderPeople = () => {
    let people = this.state.people.map(person =>
      <tr>
        <td>{person.name}</td>
        <td>{person.height}</td>
        <td>{person.mass}</td>
        <td>{person.hair_color}</td>
        <td>{person.skin_color}</td>
        <td>{person.eye_color}</td>
        <td>{person.birth_year}</td>
        <td>{person.gender}</td>
      </tr>
    )
    return(people)
  }

  render() {
    return (
      <div>
        <h2 className="display-4"><strong>People</strong></h2>
        <table className="table table-dark">
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair Colour</th>
            <th>Skin Colour</th>
            <th>Eye Colour</th>
            <th>Birth Year</th>
            <th>Gender</th>
          </tr>
          {this.renderPeople()}
        </table>
      </div>
    )
  }
}
