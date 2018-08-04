import React from 'react'
//
import logoImg from '../logo.png'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome to</h1>
        <img src={logoImg} alt="" />
      </div>
    )
  }
}
