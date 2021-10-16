import React, { Component } from 'react';
import Navigation from './views/navigation';

import './styles/style.scss';
import 'antd/dist/antd.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}

export default App;
