import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import taxiPNG from './taxi.png'

const TaxiMarker = ({ text }) => <img src={taxiPNG} style={{ width: 72, height: 64 }} alt='taxi-img' />;

class App extends React.Component {
  state = {
    numberOfTaxis: 30,
    drivers: [],
  };

  static defaultProps = {
    center: {
      lat: 51.5049375,
      lng: -0.0964509,
    },
    zoom: 14,

  };

  componentDidMount() {
    this._fetchTaxis(this.state.numberOfTaxis);
  }

  _fetchTaxis = numberOfTaxis => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/drivers?latitude=${this.props.center.lat}&longitude=${this.props.center.lng}&count=${numberOfTaxis}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.drivers && Array.isArray(data.drivers)) {
          this.setState({ drivers: data.drivers });
        }
      })
      .catch(error => console.log(error));
  }

  _handleSliderChange = number => {
    this._fetchTaxis(number);
    this.setState({ numberOfTaxis: number });
  }

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
          { this.state.drivers.map(taxi => {
            return (
              <TaxiMarker
                key={taxi.driver_id}
                lat={taxi.location.latitude}
                lng={taxi.location.longitude}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
