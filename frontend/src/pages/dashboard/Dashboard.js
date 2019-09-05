import { statement } from "@babel/template";
import React, { Component } from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import listDragonsApi from '../../services/api'
import { history } from '../../history'
import { Link } from 'react-router-dom'
import Detail from '../detail'

import bookImg from './spellbook.png'
import './Dashboard.css'

import Modal from '../../../src/components/modal'

class Dashboard extends Component {

  state = {
    dragonId: '',
    dragonsName: [],
    dragonsRemove: [],
    idDragon: '',
    newDragonName: '',
    newDragonType: '',
    newDragonHistory: [],
    createdAt: '',
  }

  async componentDidMount() {
    this.listDragons()

    const { id } = this.props.match.params;

    if (id) {
      const response = await listDragonsApi.get(`dragon/${id}`);
      const { name, type } = response.data;
      this.setState({ name, type });
    }
    // this.handleEdit()
  }

  handleSubmit = async e => {
    // e.preventDefault();
    const name = this.state.name;
    const type = this.state.type;
    const histories = this.state.histories;
    // const { id } = this.props.match.params;
    const id = this.state.id;

    await listDragonsApi.put(`/dragon/${id}`, { name, type });
    this.setState({ message: `Dragão "${name}" alterado com sucesso.`, });

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  listDragons = async () => {
    const response = await listDragonsApi.get('/dragon')
    const dragons = response.data.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })

    this.setState({ dragonsName: dragons })
  }

  handleDelete = async (id) => {
    const response = await listDragonsApi.delete(`dragon/${id}`)

    window.location.reload();
  }

  handleEdit = async (values) => {
    // e.preventDefault()
    const { id } = this.props.match.params;
    // const name = this.state.name;
    // const type = this.state.type;
    // const history = this.state.histories

    await listDragonsApi.put(`/dragon/${id}`, values/*{
      // name,
      // type,
      // history
      // id: this.state.idDragon,
      // name: this.state.newDragonName,
      // type: this.state.newDragonType,
      // history: this.state.newDragonHistory
    }*/)

    // this.setState({ dragonId: idDragon: "", newDragonName: "", newDragonType: "", newDragonHistory: [] })

    window.location.reload()
  }

  detailPage = async (id, name, type, histories, createdAt) => {
    const { data: dragon } = await listDragonsApi.get(`/dragon/${id}`, {
      id: this.state.idDragon,
      name: this.state.newDragonName,
      type: this.state.newDragonType,
      history: this.state.newDragonHistory,
      createdAt: this.state.createdAt
    })
  }

  modalEdit = async (id) => {
    const { data: dragon } = await listDragonsApi.put(`/dragon/${id}`)

    const element = document.querySelector('.modalEdit')
    element.classList.add('animated', 'bounceInDown', 'modalAnimate')
    // document.querySelector('.fieldId').value = id
    // document.querySelector('.fieldName').innerHTML = name
    // document.querySelector('.fieldType').innerHTML = type
    // document.querySelector('.fieldHistories').innerHTML = histories

    // handleEdit()

  }

  render() {

    const { name, id, type, message, histories } = this.state;

    return (
      <div className="card">
        <img src={bookImg} alt="" />
        <h2 className="card-title">
          Meus dragões
        </h2>
        <ul className="list">
          <h3 className="list-title">Nome</h3>
          {this.state.dragonsName.map(dragon => (
            <li key={dragon.id}>
              {dragon.name}
              <div className="modal modalEdit">
                {/*<form onSubmit={this.handleEdit}>
                  <h2 className="center">Editar dragão</h2>
                  <input
                    type="text"
                    name="id"
                    className="fieldId"
                    placeholder="id"
                    onSubmit={e => this.setState({ [e.target.id]: e.target.value })}
                    value={dragon.id}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    onChange={e => this.setState({ [e.target.name]: e.target.value })}
                    value={name}
                    required
                  />
                  <input
                    type="text"
                    name="type"
                    placeholder="Tipo"
                    onChange={e => this.setState({ [e.target.type]: e.target.value })}
                    value={type}
                    required
                  />
                  <input
                    type="text"
                    name="histories"
                    placeholder="Tipo"
                    onChange={e => this.setState({ [e.target.histories]: e.target.value })}
                    value={histories}
                    required
                  />
                  <button type="submit">Enviar</button>
                </form>
              </div> */}
                <Formik
                  initialValues={{}}
                  onSubmit={this.handleEdit}
                // validationSchema={validations}
                >
                  <Form className="form">
                    <div className="form-wrapper">
                      <div className="form-group">
                        <Field className="form-input" type="text" name="id" value={dragon.id} />
                        <Field className="form-input" type="text" name="name" />
                      </div>
                      <div className="form-group">
                        <Field className="form-input" type="text" name="type" />
                      </div>
                      <div className="form-group">
                        <Field className="form-input" type="text" name="histories" />
                      </div>
                      <button className="form-button" type="submit">Login</button>
                    </div>
                  </Form>
                </Formik>
              </div>
              <button onClick={() => this.modalEdit(dragon.id)}>Editar</button>
              <Link to={`/detail/${dragon.id}`}><button onClick={() => this.detailPage(dragon.id, dragon.name, dragon.type, dragon.histories, dragon.createdAt)}>Ver Detalhes</button></Link>
              <Link to={`/edit/${dragon.id}`}><button onClick={() => this.detailPage(dragon.id, dragon.name, dragon.type, dragon.histories, dragon.createdAt)}>Editar</button></Link>
              <button onClick={() => this.handleDelete(dragon.id)}>Remover</button>
            </li>
          ))}
        </ul>

      </div>
    )
  }
}

export default Dashboard