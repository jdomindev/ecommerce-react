import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';


const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' , firstName: '', lastName: ''});

  const [addUser] = useMutation(ADD_USER);
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    setLoading(true)

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // setUserFormData({
    //   email: '',
    //   password: '',
    // });
  };

  return (
    <>
    
    <div className='col-md-12'>
        <div className='d-flex justify-content-center form-container'>
          <Card className='login-card'>
            <div className='d-flex justify-content-center'>
              <h2>Create Account</h2>
            </div>
              {/* This is needed for the validation functionality above */}
              <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                  {/* show alert if server response is bad */}
                  <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                  Something went wrong with your signup!
                  </Alert>
                  <Form.Group>
                  <Form.Label htmlFor='firstName'>First Name</Form.Label>
                  <Form.Control
                      type='text'
                      placeholder='First Name'
                      name='firstName'
                      onChange={handleInputChange}
                      value={userFormData.firstName}
                      required
                  />
                  <Form.Control.Feedback type='invalid'>First Name is required!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label htmlFor='firstName'>Last Name</Form.Label>
                  <Form.Control
                      type='text'
                      placeholder='Last Name'
                      name='lastName'
                      onChange={handleInputChange}
                      value={userFormData.lastName}
                      required
                  />
                  <Form.Control.Feedback type='invalid'>Last Name is required!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label htmlFor='email'>Email</Form.Label>
                  <Form.Control
                      type='email'
                      placeholder='Your email address'
                      name='email'
                      onChange={handleInputChange}
                      value={userFormData.email}
                      required
                  />
                  <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label htmlFor='password'>Password</Form.Label>
                  <Form.Control
                      type='password'
                      placeholder='Your password'
                      name='password'
                      onChange={handleInputChange}
                      value={userFormData.password}
                      required
                  />
                  <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className='d-flex justify-content-center'>
                      <Button
                      className='btn-custom'  
                      disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password)}
                      type='submit'
                      variant='success'>
                      {!loading ? ("Submit") : <div className="lds-ring-checkout"><div></div><div></div><div></div><div></div></div>}
                      </Button>
                      
                  </div>
                  <p className="text-right m-0">
                      <Link className="forgot-password" to="/login">Login</Link>
                  </p>
              </Form>
          </Card>
        </div>
    </div>
    </>
  );
};

export default Signup;