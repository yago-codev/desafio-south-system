import React from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import './Login.css'
import dragonImg from '../../dragon.png'
import dragonAnimate from './dragon-animation.gif'


const Login = () => {
  const handleSubmit = values => {
    axios.post('http://localhost:8080/v1/api/auth', values)
      .then(resp => {
        const { data } = resp
        if (data) {
          localStorage.setItem('app-token', data)
          history.push('/dashboard')
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
            <img className="form-img-login" src={dragonAnimate} />
            <h1 className="form-title mb-15">entrar</h1>
            <div className="form-group">
              <Field className="form-input" name="email" placeholder="Insira seu email:"/>
              <ErrorMessage className="span-error-message" component="span" name="email" />
            </div>
            <div className="form-group">
              <Field className="form-input" type="password" name="password" placeholder="Insira sua senha:"/>
              <ErrorMessage className="span-error-message" component="span" name="password" />
            </div>
            <button className="form-button" type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default Login