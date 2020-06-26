import React, { Component } from 'react';
import { BrowserRouter, Switch,Route } from "react-router-dom";
import Home from './Components/Home/home.js';
import Books from './Components/BooksUnderCategory/booksUnderCategory';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/books/:bookCategory" exact component={Books} />
        </Switch>  
      </BrowserRouter>
    );
  }
}

export default App;
