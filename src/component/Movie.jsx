import React, { Component } from "react";
import axios from "axios";
import { Button, Segment, Message, Header, Menu, Grid, GridColumn } from 'semantic-ui-react'

class Movie extends Component {
  state = {
    randomMovie: null,
    watchlistMessage: {},
    watchlist: [],
    showWatchlist: false
  };

  addToWatchlist = async (film) => {
    let movie = film
    let credentials = await JSON.parse(sessionStorage.getItem("credentials"))
    let headers = {
      ...credentials,
      "Content-type": "application/json",
      Accept: "application/json"
    }
    
    let response = await axios.post(
        `/watchlist_items`,
        {
          movie_db_id: movie.id,
          title: movie.title
        },
        {
          headers: headers,
        }
      )
    

    this.setState({
      watchlistMessage: {
        message: response.data.message,
        id: movie.id,
      },
      watchlist: response.data.watchlist.watchlist_items
    })
  }

  getRandomMovie = async () => {
    let response = await axios.get(`/movies/random`);
    this.setState({ randomMovie: response.data.movie });
  }

  render() {
    let randomMovie;
    let watchlistDetailsDisplay
    this.state.randomMovie && (
      randomMovie = (
        <Segment>
        <div id="random-movie">
          <h2 id="movie-title">{this.state.randomMovie.title}</h2>
          <h3>Description</h3>
          <p id="movie-overview">{this.state.randomMovie.overview}</p>
          <p id="movie-release-date">This movie was released in {this.state.randomMovie.release_date}</p>
          <p id="movie-rating">A total of {this.state.randomMovie.vote_count} persons has rated this movie. It has an average rating of {this.state.randomMovie.vote_average}</p>

          {this.props.authenticated && (

            <Button color='black' id="watchlist-button" onClick={() => this.addToWatchlist(this.state.randomMovie)} >Add to Watchlist</Button>

          )}
          <p id="watchlist-message">{this.state.watchlistMessage.message}</p>
        </div>
        </Segment>
      )
    )

    if (this.state.watchlist.length != 0) {
      watchlistDetailsDisplay = this.state.watchlist.map((movie) => {
        return <li key={movie.title}>{`${movie.title}`}</li>;
      });
    } else {
      watchlistDetailsDisplay = "You have no movies in your watchlist";
    }

    return (
      <>
      
        <div>
       
          <Segment style={{ marginLeft: '5em', marginRight: '25em', marginTop: '2em' }}>
            <Message floating color="teal" size='large'
             header='What Should I Watch?'
             content='If you are wondering what movie you could watch and enjoy your free time, use Movie Selector randomizer below.'
            />
            <Button color='black' onClick={this.getRandomMovie} >Randomize Movie</Button>
            
           
            {randomMovie}
            </Segment>
           
        </div>
        <div>
       
       
        {this.props.authenticated && (
       
          <Button color='black'
            onClick={() => this.setState({ showWatchlist: !this.state.showWatchlist })}
          >
            View watchlist
          </Button>
        )}
        {this.state.showWatchlist &&
          <>
            <ul id="watchlist-details">{watchlistDetailsDisplay}</ul>
          </>
        
        }
        
     
        
       
</div>
      </>
    );
  }
}

export default Movie;