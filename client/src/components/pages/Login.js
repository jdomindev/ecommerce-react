import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Form, Button, Card } from 'react-bootstrap'
import "../assets/Login.css"

import Auth from '../../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);
  const [loading, setLoading] = useState(false)


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      alert(e)
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
    
        <div className='col-md-12'>
            <div className='d-flex justify-content-center form-container'>
                <Card className='login-card'>
                  <div className='d-flex justify-content-center'>
                    <h2>Login</h2>
                  </div>
                    <Form onSubmit={handleFormSubmit} className="login-form">
                    <Form.Group >
                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Your email address'
                            name='email'
                            onChange={handleChange}
                            value={formState.email}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group >
                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Your password'
                            name='password'
                            onChange={handleChange}
                            value={formState.password}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button
                            className='btn-custom'
                            type='submit'
                            variant='success'>
                            {!loading ? ("Submit") : <div className="lds-ring-checkout"><div></div><div></div><div></div><div></div></div>}
                            </Button>
                        </div>
                        <p className="float-left m-0">
                          <Link className="forgot-password" to="/signup">Create New Account</Link>
                        </p>
                        <p className="float-right m-0">
                          Forgot <Link className="forgot-password" to="/">password?</Link>
                        </p>
                    </Form>
                </Card>
            </div>
        </div>
    </>
  );
};

export default Login;
