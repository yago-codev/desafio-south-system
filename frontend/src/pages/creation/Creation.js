import { statement } from "@babel/template";

import React, { Component } from 'react'
import axios from 'axios'
// import { ErrorMessage, Formik, Form, Field } from 'formik'
import { history } from '../../history'
import { Link } from 'react-router-dom';
import listDragonsApi from '../../services/api'

import dragonAnimation from './dragon-animation.gif'
import './Creation.css'
import dragonImg from '../../dragon.png'
class Creation extends Component {

  state = {
    newDragonName: '',
    newDragonType: '',
    newDragonHistory: [],
  }

  handleDragonSave = async e => {
    e.preventDefault()

    const { data: dragon } = await listDragonsApi.post('/dragon', {
      name: this.state.newDragonName,
      type: this.state.newDragonType,
      histories: this.state.newDragonHistory
    })

    this.setState({ dragons: [this.state.dragons, dragon], newDragonName: "", newDragonType: "", newDragonHistory: [] })

    history.push('/dashboard')
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleDragonSave}>
        <div className="form-wrapper">
          <img className="form-img" src={dragonAnimation} />
          <h1 className="form-title mb-15">Awasome Dragons</h1>
          <div className="form-group">
            <input
              onChange={e => this.setState({ newDragonName: e.target.value })}
              className="form-input"
              type="text"
              name="name"
              placeholder="Nome do seu novo dragão"
              value={this.state.newDragonName} />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              onChange={e => this.setState({ newDragonType: e.target.value })}
              type="text"
              name="type"
              value={this.state.newDragonType}
              placeholder="Tipo do seu novo dragão"
            />
          </div>
          <div className="form-group">
            <input
              onChange={e => this.setState({ newDragonHistory: e.target.value })}
              value={this.state.newDragonHistory}
              className="form-input"
              type="text"
              name="histories"
              placeholder="História do dragão"
            />
          </div>
          <button className="form-button" type="submit">Criar</button>
        </div>
      </form>
    )
  }
}

export default Creation