import React from 'react';
import PropTypes from 'prop-types';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

var markerOk = require('../../public/google_maps_icon.jpg');

export class MapView extends React.Component {
  constructor() {
    super()
  this.state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedJob: {},
  };
  this.onMarkerClick = this.onMarkerClick.bind(this);
  this.onMapClicked = this.onMapClicked.bind(this);
}

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedJob: props.job,
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

    const ne_lat = this.props.directions.bounds.northeast.lat;
    const ne_lng = this.props.directions.bounds.northeast.lng;

    const sw_lat = this.props.directions.bounds.southwest.lat;
    const sw_lng = this.props.directions.bounds.southwest.lng;
    const center = { lat: sw_lat + ((ne_lat - sw_lat) / 2),
                     lng: sw_lng + ((ne_lng - sw_lng) / 2) }

    const self = this
    const markers = this.props.jobs.map(function(job) {
      return <Marker 
          key={job.name}
          job={job}
          onClick={self.onMarkerClick}
          icon={{url: markerOk}}
          position={{
                      lat: job.lat,
                      lng: job.lng
          }}/>
    });

    const infowindow = (<InfoWindow
      key={'infowindow'}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div style={{width: '240px'}}>
              <h3>{this.state.selectedJob.name}</h3>
              <div>{this.state.selectedJob.description}</div>
            </div>
        </InfoWindow>);

    return (
      <Map className={'map'}
           google={this.props.google}
           style={{width: '100%', height: '100%', position: 'relative'}}
           initialCenter={center} zoom={14}>
       {markers.concat([infowindow]).filter((x)=>{return x != null})}
      </Map>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ('AIzaSyBCom5sLobo4uZE-UsqgIg2XsvusgSQPdQ')
})(MapView)


MapView.propTypes = {
  directions: PropTypes.object
};

MapView.defaultProps = {
  directions: {
    overview_line: {points: ''},
    events: [],
    bounds: {
      northeast: {lat: -33.869239, lng: 151.194423},
      southwest: {lat: -33.877470, lng: 151.205860}
    }
  }
};
