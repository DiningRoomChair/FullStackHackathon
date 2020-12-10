import React, { Component } from 'react'
import axios from 'axios';

export default class Films extends Component {

  state = {
    films: []
  };

  getFilms = async function(len){
    var films = [];
    for(var i = 1; i <= len; i++){
      films.push(axios.get(`swapi.dev/api/films/${i}`)
                    .catch(err => console.warn(err))
      );
    }
    Promise.all(films).then( (response) => {
      let filmList = [];
      response.map(res => {
        if(res !== undefined){
          filmList.push(res.data);
        }
      })
      this.setState({films: filmList});
    })
  }

componentDidMount = () => {
    axios.get(`swapi.dev/api/films`)
      .then( ({data}) => {
        this.getFilms(data.count);
      })
      .catch(err => console.warn(err))
  }

  renderFilms = () => {
    let films = this.state.films.map(film =>
      <tr>
        <td>{film.title}</td>
        <td>{film.episode_id}</td>
        <td>{film.director}</td>
        <td>{film.producer}</td>
        <td>{film.release_date}</td>
        <td>{film.opening_crawl}</td>
      </tr>
    )
    return(films)
  }

  render() {
    return (
      <div>
        <h2 className="display-4"><strong>Films</strong></h2>
        <table className="table table-dark">
          <tr>
            <th>Title</th>
            <th>Episode Number</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release</th>
            <th>Opening Text</th>
          </tr>
          {this.renderFilms()}
        </table>
      </div>
    )
  }
}
