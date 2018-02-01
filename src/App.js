import React, { Component } from 'react';
import './components/style.css';
import router from './router'

import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {router}
      </div>
    );
  }
}



export default App;
