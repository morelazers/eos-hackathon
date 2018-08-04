import React from 'react'
import PropTypes from 'prop-types'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker, InfoWindow
} from 'react-google-maps'

var markerOk = require('../../public/google_maps_icon.png');

class MapComponent extends React.Component {
  state = {
    didCenter: false,
    coords: null,
    currentMarker: null,
    selectedJob: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords && !this.state.didCenter) {
      this.setState({ didCenter: true })
    }
  }

  componentDidMount() {
    // wew
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(job, props, marker, e) {
    this.setState({
      selectedJob: job,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const self = this;

    const markers = this.props.jobs.map(function(job) {
      return <Marker 
          key={job.name}
          job={job}
          onClick={self.onMarkerClick.bind(this, job)}
          icon={{url: job_icon(job.expensive, job.completed),
                 scaledSize: new window.google.maps.Size(43, 43)}}
          position={{lat: job.lat, lng: job.lng}}>
                {
           self.state.selectedJob == job && self.state.showingInfoWindow &&
           <InfoWindow
            key={'infowindow'}
                visible={self.state.showingInfoWindow}>
                  <div style={{width: '240px'}}>
                    <h3>{self.state.selectedJob.name}</h3>
                    <div>{self.state.selectedJob.description}</div>
                  </div>
              </InfoWindow>
          }
        </Marker>
    });
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
          icon={{url: markerOk}}
          shape={{
            coords: [this.props.coords.lat, this.props.coords.lng, 10],
            type: 'circle'
          }}
        />
        {markers}
      </GoogleMap>
    )
  }
}

var expensiveCompleteIcon = require('../../public/expensive_red.png');
var expensiveIncompleteIcon = require('../../public/expensive_green.png');
var cheapCompleteIcon = require('../../public/medium_red.png');
var cheapIncompleteIcon = require('../../public/medium_green.png');

var job_icon = function(expensive, completed) {
  if (expensive) {
    if (completed) {
      return expensiveCompleteIcon;
    } else {
      return expensiveIncompleteIcon;
    }
  } else {
    if (completed) {
      return cheapCompleteIcon;
    } else {
      return cheapIncompleteIcon;
    }
  }
}

export default withScriptjs(withGoogleMap(props => <MapComponent {...props} />))
