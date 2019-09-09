
import React, { Component } from 'react';
import listDragonsApi from '../../services/api'
import { Link } from "react-router-dom";
import { history } from '../../history'

import dragonAnimation from './dragon-animation.gif'
import './Edit.css'

export default class Edit extends Component {
    state = {
        name: '',
        type: '',
        histories: [],
    }

    async componentDidMount(){
      const { id } = this.props.match.params;
      
      if(id){  
          const response = await listDragonsApi.get(`/dragon/${id}`);
          const { name, type} = response.data;
          this.setState({name, type});
      }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const name = this.state.name;
        const type = this.state.type;
        const histories = this.state.histories;    
        const { id } = this.props.match.params;    

        await listDragonsApi.put(`/dragon/${id}`, {name, type, histories});

        history.push('/dashboard')
     
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

  render() {
    const { name, type, histories } = this.state;

    return (
          <form className="form" onSubmit={this.handleSubmit}>
            <img className="form-img" src={dragonAnimation} />
            <h2 className="form-title mb-15">Editar dragão</h2>
            <input
              className="form-input text-center"
              name="name"
              type="text"
              placeholder="Qual o novo nome do seu dragão?"
              value={name}
              onChange={this.handleChange}
            />
            <input
              className="form-input text-center"
              name="type"
              type="text"
              placeholder="Qual o tipo do seu novo dragão?"
              value={type}
              onChange={this.handleChange}
            />
            <input
              className="form-input text-center"
              name="histories"
              placeholder="Qual a história do seu novo dragão?"
              value={histories}
              onChange={this.handleChange}
            />
            <button className="form-button m-auto" type="submit">Enviar</button>
          </form>
    );
  }
}