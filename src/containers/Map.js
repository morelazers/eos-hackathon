import React from 'react'
import Map from './MapComponent.js'

export default class MapScreen extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <Map
        jobs={[
          {'name': 'Test 2', 
           'description': 'Test 2',
           'lat': -33.874166, 'lng': 151.203071},
          {'name': 'Test 1', 
           'description': 'Find a place called testie mc test face',
           'lat': -33.878166, 'lng': 151.204071},
        ]}
      />
    )
  }
}
