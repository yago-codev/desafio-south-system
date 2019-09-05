
import React, { Component } from 'react';
import listDragonsApi from '../../services/api'
import { Link } from "react-router-dom";
import { history } from '../../history'


export default class Edit extends Component {
  state = {
    name: '',
    type: '',
    message: false,
  }

  async componentDidMount() {

    const { id } = this.props.match.params;
    if (id) {
      const response = await listDragonsApi.get(`/dragon/${id}`);
      const { name, type } = response.data;
      this.setState({ name, type });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const name = this.state.name;
    const type = this.state.type;
    const { id } = this.props.match.params;

    await listDragonsApi.put(`/dragon/${id}`, { name, type });
    this.setState({ message: `Dragão "${name}" alterado com sucesso.` });

    history.push('/dashboard')

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  closeAlert = () => {
    this.setState({ message: false });
  }

  render() {
    const { auth, name, type, message } = this.state;
    return (
      <div className="render">

        <form id="new-post" onSubmit={this.handleSubmit}>
          <h2 className="center">Editar dragão</h2>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={this.handleChange}
            value={name}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo"
            onChange={this.handleChange}
            value={type}
            required
          />

          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}