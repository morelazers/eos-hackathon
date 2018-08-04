import React from 'react'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

export default class CameraScreen extends React.Component {
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location.coords.latitude)
      console.log(location.coords.longitude)
      console.log(location.coords.accuracy)
    })
  }

  onTakePhoto(dataUri) {
    console.log(dataUri)
    // then get the gps coords
  }
  render() {
    return (
      <Camera
        onTakePhoto={dataUri => {
          this.onTakePhoto(dataUri)
        }}
      />
    )
  }
}
