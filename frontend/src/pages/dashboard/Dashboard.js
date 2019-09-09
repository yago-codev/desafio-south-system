import { statement } from "@babel/template";
import React, { Component } from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import listDragonsApi from '../../services/api'
import { history } from '../../history'
import { Link } from 'react-router-dom'
import Detail from '../detail'

import iconDelete from './delete.svg'
import iconRead from './read.svg'
import iconCreate from './create.svg'
import iconEdit from './edit.svg'
import friendDragons from './friend-dragons.png'
import bookImg from './spellbook.png'
import './Dashboard.css'
import Modal from '../../../src/components/modal'
import Header from '../../../src/components/header'

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
  }

  handleSubmit = async e => {
    // e.preventDefault();
    const name = this.state.name;
    const type = this.state.type;
    const histories = this.state.histories;
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
    const { id } = this.props.match.params;

    await listDragonsApi.put(`/dragon/${id}`, values)
    
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
  }

  render() {
    const { name, id, type, histories } = this.state;

    return (
      <div className="container-list">
        <Header></Header>
        <div className="card">
          <img className="card-img-dashboard" src={friendDragons} alt="" />
          <h2 className="card-title">
            Meus dragões
          </h2>
          <div className="container-list">
          {this.state.dragonsName.map(dragon => (
          <ul className="list">
            <li className="list-item">
              {dragon.name}
              <div className="modal modalEdit">
                <Formik
                  initialValues={{}}
                  onSubmit={this.handleEdit}
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
              <div className="container-btn">
                <Link to={`/creation`}><img className="icon-edit" src={iconCreate}/></Link>
                <Link to={`/edit/${dragon.id}`}><img className="icon-edit" src={iconEdit}/></Link>
                <Link to={`/detail/${dragon.id}`}><img src={iconRead} className="icon-edit"/></Link>
                <img src={iconDelete} className="icon-edit" onClick={() => this.handleDelete(dragon.id)}/>
              </div>
            </li>
          </ul>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard