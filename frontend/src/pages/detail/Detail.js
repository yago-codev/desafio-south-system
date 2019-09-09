import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import './Detail.css';

export default class Dragons extends Component {
    state = {
        dragon: {},
    };

    async componentDidMount(){
        console.log(this.props);
        const { id } = this.props.match.params;
        
        const response = await api.get(`/dragon/${id}`);

        this.setState({ dragon: response.data });
    }

    render() {
      const { dragon } = this.state;

      return (
        <div className="container-list">
          <div className="card">
            <h1 className="mb-15">Detalhes do dragão</h1>
            <ul>
              <li className="list-item-detail">{dragon.name}</li>
              <li className="list-item-detail">{dragon.type}</li>
              <li className="list-item-detail">{dragon.createdAt}</li>
            </ul> 
          </div>
        </div>
      ) 
    }
}