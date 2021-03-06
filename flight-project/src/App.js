import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Routes from './routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor(){
    super();
    library.add(faEdit, faTrashAlt)
    this.state={
      appName: "Juryvox Airlines",
    }
  }

  render(){
    return  <div className="App">
              <Header/>
              <Routes name={this.state.appName}/>
              <Footer/>
            </div>
  }

}

export default App;
