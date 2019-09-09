import React, { Component } from 'react'
import { history } from '../../history'
import { Link } from 'react-router-dom'

import './Header.css'
import logo from './logo-dragon.svg'
import Logout from '../logout'


export default class Header extends Component {
  
  logout = () => localStorage.removeItem('app-token')

  render() {
    return(
      <nav className="navbar">
        <ul>
          <div >
            <Link className="link container-logo" to="/dashboard">
              <img src={logo}/>
              <h1 className="title-logo">South Dragons</h1>
            </Link>
          </div>

          <a href="https://www.linkedin.com/in/yago-milano/" target="_blank" className="link"><li>Linkedin</li></a>
          <a href="https://github.com/yago-codev/" target="_blank" className="link"><li>Github</li></a>
          <Link className="link" to="/login">
            <li onClick={this.logout}>Logout</li>
          </Link>
        </ul>
      </nav>
    )
  }
}