import React, { Component } from 'react';
import News from './Components/News';
import Navbar from './Components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'general',
    };
    this.setCurrentView = this.setCurrentView.bind(this);
  }

  setCurrentView(view) {
    this.setState({ currentView: view });
  }

  renderView() {
    switch (this.state.currentView) {
      case 'business':
        return <News key="business" pageSize={5} country="in" category="business" />;
      case 'entertainment':
        return <News key="entertainment" pageSize={5} country="in" category="entertainment" />;
      case 'health':
        return <News key="health" pageSize={5} country="in" category="health" />;
      case 'science':
        return <News key="science" pageSize={5} country="in" category="science" />;
      case 'sports':
        return <News key="sports" pageSize={5} country="in" category="sports" />;
      case 'technology':
        return <News key="technology" pageSize={5} country="in" category="technology" />;
      case 'general':
      default:
        return <News key="general" pageSize={5} country="in" category="general" />;
    }
  }

  render() {
    return (
      <div>
        <Navbar setCurrentView={this.setCurrentView} />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {this.renderView()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
