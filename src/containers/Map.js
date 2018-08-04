import React from 'react'
import MapComponent from './MapComponent.js'

export default class MapScreen extends React.Component {
  state = {
    lng: null,
    lat: null,
    acc: null
  }

  componentWillMount() {
    const id = navigator.geolocation.watchPosition(pos => {
      const { longitude, latitude, accuracy } = pos.coords
      this.setState({
        lng: longitude,
        lat: latitude,
        acc: accuracy
      })
    })
  }

  render() {
    return (
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCom5sLobo4uZE-UsqgIg2XsvusgSQPdQ&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        coords={this.state}
        jobs={[
          {'name': 'Test 2', 
           'description': 'Test 2',
           'lat': -33.874166, 'lng': 151.203071, 
           'completed': false,
           'expensive': false
          },
          {'name': 'Test 1', 
           'description': 'Find a place called testie mc test face',
           'lat': -33.878166, 'lng': 151.204071,
           'completed': true,
           'expensive': true
          },
          {'name': 'Test 3', 
           'description': 'Test 2',
           'lat': -33.874166, 'lng': 151.204071, 
           'completed': true,
           'expensive': false
          },
          {'name': 'Test 4', 
           'description': 'Find a place called testie mc test face',
           'lat': -33.878166, 'lng': 151.203071,
           'completed': false,
           'expensive': true
          },
        ]}
      />
    )
  }
}
