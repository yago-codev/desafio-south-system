import React, { Component } from 'react'
import { history } from '../../history'
import { Link } from 'react-router-dom'

export default class Logout extends Component {
  
  render() {
    return (
      <li onclick={this.logout()}>Logout</li>
    )
  }
}