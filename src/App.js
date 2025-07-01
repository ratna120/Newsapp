import React, { Component } from 'react';
import News from './Components/News';
import Navbar from './Components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <News
                key="general"
                pageSize={5}
                country="in"
                category="general"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
