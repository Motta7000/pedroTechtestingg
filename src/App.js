import './App.css';

import { useState, useEffect } from 'react';
import Axios from 'axios';
function App() {

  const [movieName, setMovieName] = useState('a');
  const [review, setReview] = useState('a');
  const [movieReviewList, setMovieReviewList] = useState([])
  const [update,setUpdate] = useState(null)

  useEffect(() => {
    Axios.get('https://pedro-test-heroku.herokuapp.com/api/get').then((response) => {
      setMovieReviewList(response.data)
    })
  }, [])

  const deleteReview = (movie) => {
    console.log("MOVIE: " + movie)
    Axios.delete(`https://pedro-test-heroku.herokuapp.com/api/delete/${movie}`).then((err) => {
      alert(err);
    });
    console.log(movieReviewList)
    setMovieReviewList(movieReviewList.filter((i) => i.movieName != movie))
  }

  const updateReview = (movie) => {
    Axios.put(`https://pedro-test-heroku.herokuapp.com/api/update`,{
      movieName:movie,
      movieReview:update,
    });
    movieReviewList.filter((i) => i.movieName === movie).map ((i) => i.movie_review = update)
    setUpdate("")
  };

  const submitReview = () => {
    console.log(movieName);
    console.log(review)
    Axios.post('https://pedro-test-heroku.herokuapp.com/api/insert', {
      movieName: movieName,
      movieReview: review,
    }).then((err) => {
      alert(err);

    });
    setMovieReviewList([...movieReviewList, { movieName: movieName, movieReview: review }])
    
  };
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => setMovieName(e.target.value)} />
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => setReview(e.target.value)} />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((movie) => {
          return (
            <div className='card'>
              <h1>MovieName: {movie.movieName}</h1>
              <p>Movie Review:{movie.movie_review}</p>
              <div style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}> 
                <button onClick={() => deleteReview(movie.movieName)} >Delete</button>
                <input onChange={(e) => setUpdate(e.target.value)} cols="40" style={{ resize: 'none' }} rows="5" type="text" id="updateInput"></input>
                <button onClick={() => {updateReview(movie.movieName)}}>Update</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
