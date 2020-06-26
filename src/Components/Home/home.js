import React, { Component } from 'react';
import './home.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.bookCategory ="";
  }

  render() {
    return (
      <div className="home container-fluid">
        <div className="row home-page">
          <div className="col-md-1 col-sm-1"> </div>
            <div className="col-md-10 col-sm-10">
              <h1>Gutenberg Project</h1>
              <div className="desc">A social cataloging website that allows you to
                  freely search its database of books,
                  annotations, and reviews.</div>
            </div>
          <div className="col-md-1 col-sm-1"> </div>
        </div>
        <div>
          {this.renderBookCategories()}
        </div>
      </div>  
    );
  }

  renderBookCategories(){
    var genreObj1 = {
      "FICTION": "/Assets/Fiction.svg", "DRAMA": "/Assets/Drama.svg",
      "HUMOUR": "/Assets/Humour.svg", "POLITICS": "/Assets/Politics.svg"
    };

    var genreObj2 = {
      "PHILOSOPHY": "/Assets/Philosophy.svg", "HISTORY": "/Assets/History.svg", 
      "ADVENTURE": "/Assets/Adventure.svg"
    };

    return(
      <div className="row">
      <div className="col-md-1 col-sm-1"></div>
      <div className="col-md-5 col-sm-10">
        {Object.entries(genreObj1).map(([key, value]) =>
        <div className="customCard">
          <a href={`/books/${key}`}>
            <span>
              <img src={value} className="imgSrc"/>
                &nbsp;&nbsp;&nbsp;
              <div className="card-body">
                {key}
              </div>
                <img src="/Assets/Next.svg" className="imgSrc"/>
            </span>
          </a>
        </div>
        )}
      </div>

      <div className="col-md-5 col-sm-10">
        {Object.entries(genreObj2).map(([key, value]) =>
        <div className="customCard">
          <a href={`/books/${key}`}>
            <span>
              <img src={value} className="imgSrc"/>
                &nbsp;&nbsp;&nbsp;
              <div className="card-body">
                {key}
              </div>
                <img src="/Assets/Next.svg" className="imgSrc"/>
            </span>
          </a>
        </div>
        )}
      </div>
      <div className="col-md-1 col-sm-1"></div>
      </div>
    )
  }
}

export default Home;
