import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import taxiPNG from './taxi.png'

const TaxiMarker = ({ text }) => <img src={taxiPNG} style={{ width: 72, height: 64 }} alt='taxi-img' />;

class App extends React.Component {
  state = {
    numberOfTaxis: 1,
  };

  static defaultProps = {
    center: {
      lat: 51.5049375,
      lng: -0.0964509,
    },
    zoom: 11,

  };

  _handleSliderChange = number => this.setState({ numberOfTaxis: number });

  render() {
    return (
      <div className="App" style={{ height: '80vh', width: '100%' }}>
        <div style={{ padding: '16px 64px 32px' }}>
          <p>Number of taxis: {this.state.numberOfTaxis}</p>
          <Slider
            value={this.state.numberOfTaxis}
            onChange={this._handleSliderChange}
            min={1}
            max={50}
          />
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <TaxiMarker
            lat={51.5049375}
            lng={-0.0964509}
            text="My Marker"
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
