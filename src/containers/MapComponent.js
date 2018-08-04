import React from 'react'
import PropTypes from 'prop-types'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

class MapComponent extends React.Component {
  state = {
    didCenter: false,
    coords: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords && !this.state.didCenter) {
      this.setState({ didCenter: true })
    }
  }

  componentDidMount() {
    // wew
  }

  render() {
    console.log(this.props)
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={this.props.coords || { lat: 1, lng: 1 }}
        mapTypeId={'satellite'}
        options={{ fullscreenControl: false }}
      >
        <Marker
          position={this.props.coords}
          defaultShape={'circle'}
          shape={{
            coords: [this.props.coords.lat, this.props.coords.lng, 10],
            type: 'circle'
          }}
        />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(props => <MapComponent {...props} />))
