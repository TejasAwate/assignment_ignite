import React, { Component } from 'react';
import './booksUnderCategory.css';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class Books extends Component {

  constructor(props){
    super(props);
    this.books = props.match.params;
    //console.log(this.books);
    this.state={
      books:[],
      searchBook:"",
      isLoading:true,
      isSearching:false,
    };
  }


  componentDidMount(){
    fetch("http://skunkworks.ignitesol.com:8000/books/?mime_type=image&topic=" + this.books.bookCategory ,
      {
        headers:{
          'Content-Type': 'application/json',
           Accept: 'application/json',
        },
      })
    .then((results) => results.json())
    .then((data)=> {
      this.setState({
        books:data.results,
        isLoading:false,
      })
    })    
  }

  render(){
    let bookCategory = this.books.bookCategory;
    bookCategory = bookCategory.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});

    //console.log(this.state.isLoading);
    if(this.state.isLoading){
      return(
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )
    }
    else{
      return(
        <div className="booksList container-fluid">
            <span>
              <img src="/Assets/Back.svg" onClick ={()=>history.goBack()} alt="back" className="imgSrc"></img>
                &nbsp; &nbsp;
                <h2>{bookCategory}</h2>
            </span>

          {this.renderSearchBar()}
          {this.renderList()}
        </div>
      );
    } 
  }

  renderList(){
    return(
      <div className="row searchResults">
        {this.state.books.map((book) => {
          var bookLink = "";
          if((book.formats.hasOwnProperty("text/html; charset=utf-8")) && (book.formats["text/html; charset=utf-8"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/html; charset=utf-8"];
          }
          else if(book.formats.hasOwnProperty("text/html; charset=iso-8859-1") && (book.formats["text/html; charset=iso-8859-1"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/html; charset=iso-8859-1"];
          }
          else if(book.formats.hasOwnProperty("text/html; charset=us-ascii") && (book.formats["text/html; charset=us-ascii"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/html; charset=us-ascii"];
          }
          else if(book.formats.hasOwnProperty("text/plain") && (book.formats["text/plain"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/plain"];
          }
          else if(book.formats.hasOwnProperty("text/plain; charset=us-ascii") && (book.formats["text/plain; charset=us-ascii"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/plain; charset=us-ascii"];
          }
          else if(book.formats.hasOwnProperty("text/plain; charset=utf-8") && (book.formats["text/plain; charset=utf-8"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/plain; charset=utf-8"];
          }
          else if(book.formats.hasOwnProperty("text/plain; charset=iso-8859-1") && (book.formats["text/plain; charset=iso-8859-1"]).split('.').pop()!=="zip"){
            bookLink=book.formats["text/plain; charset=iso-8859-1"];
          }
          else{
            bookLink="No Viewable Version Available";
          }
          
          return(
            <div key={book.id} className="col-md-4 col-sm-2 cardContainer">
                { bookLink !=="No Viewable Version Available" ? 
                  <img className="card-img-top cardCustom" src={book.formats["image/jpeg"]}  onClick={()=> window.open(bookLink,"_blank")}
                    alt="No image found!"/>
                    :
                  <img className="card-img-top cardCustom" src={book.formats["image/jpeg"]}  onClick={()=> alert("No Viewable Version Available")}
                    alt="cannot display"/>
                }
                <div className="bookName">
                  {book.title}
                </div>
                {book.authors.length !== 0 ? 
                  <div className="bookAuther">
                    <small className="text-muted">{book.authors[0].name}</small>
                  </div>
                : null }
            </div>
          )
        })}
      </div>
    )
  }

  renderSearchBar(){
    if(this.state.isSearching){
      return(
        <div className="searchBar" >
          <input 
            className="form-control mr-sm-2"
            type="text"
            value={this.state.searchBook}
            placeholder="Search"
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.onPressEnterForSearch.bind(this)}
          /> 
          <img className="closeIcon" src="/Assets/Close.svg" alt="close" onClick={()=>this.onPressCancel()}/>
        </div>
      )
    }
    else{
      return(
        <div className="searchBar" >
          <input 
            className="form-control mr-sm-2"
            type="text"
            value={this.state.searchBook}
            placeholder="Search"
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.onPressEnterForSearch.bind(this)}
          /> 
        </div>
      )
    }
  }

  onPressCancel(){
    this.setState({
      searchBook:""
    });
    window.location.reload();
  }

  handleChange(event) {
    this.setState({searchBook: event.target.value});
  }

  onPressEnterForSearch(event){
    var code = event.keyCode || event.which;
    if(code === 13){
      fetch("http://skunkworks.ignitesol.com:8000/books/?mime_type=image&topic=" + this.books.bookCategory + "&search=" + this.state.searchBook,
        {
          headers:{
            'Content-Type': 'application/json',
             Accept: 'application/json',
          },
        })
      .then((results) => results.json())
      .then((data)=> {
        //console.log(data.results[0].formats["image/jpeg"]);
        //console.log(data.results[1].authors[0].name);
        //console.log(data.results[0].formats["text/html; charset=utf-8"]);
        this.setState({
          books:data.results,
          isSearching:true,
        })
      })
    }   
  }
}

export default Books; 
