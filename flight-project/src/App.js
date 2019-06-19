import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header'
import Routes from './routes';

class App extends Component {

  constructor(){
    super();
    this.state={
      appName: "NYK Airlines",
    }
  }

  render(){
    return  <body className="App">
              <Header/>
              <Routes name={this.state.appName}/>
            </body>
  }

}

export default App;
