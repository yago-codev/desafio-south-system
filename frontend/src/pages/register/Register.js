import React from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import './Register.css'
import dragonImg from '../../dragon.png'
import dragonAnimation from './dragon-animation.gif'

const Register = () => {
  const handleSubmit = values => {
    axios.post('http://localhost:8080/v1/api/user', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          // history.push('/login')
          window.location.href= '/login'
        }
      })
  }
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form className="form">
          <div className="form-wrapper">
            <img className="form-img" src={dragonImg} />
            <h1 className="form-title mb-15">Awasome Dragons</h1>
            <div className="form-group">
              <Field
                className="form-input"
                name="firstName"
                placeholder="Insira seu primeiro nome" />
              <ErrorMessage className="span-error-message" component="span" name="firstName" />
            </div>
            <div className="form-group">
              <Field
                className="form-input"
                name="lastName"
                placeholder="Insira seu segundo nome" />
              <ErrorMessage
                className="span-error-message"
                component="span"
                name="lastName" />
            </div>
            <div className="form-group">
              <Field
                className="form-input"
                name="email"
                placeholder="Insira seu e-mail" />
              <ErrorMessage className="span-error-message" component="span" name="email" />
            </div>
            <div className="form-group">
              <Field
                className="form-input"
                type="password"
                name="password"
                placeholder="Insira sua senha" />
              <ErrorMessage className="span-error-message" component="span" name="password" />
            </div>
            <button className="form-button" type="submit">Registrar</button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default Register