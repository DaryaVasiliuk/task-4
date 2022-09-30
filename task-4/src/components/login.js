import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../index.css';
import '../App.css';
import { useState } from 'react';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handler = (event)=> {
    event.preventDefault();
    console.log(email, password)
    fetch('http://localhost:4000/registration', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
     }),
     headers: {
      'Content-type': 'application/json; charset=UTF-8',
   },
    })
    .then((res) => { return res.json() })
    .then((res) => { console.log('res',res.status === 200, res) });
  
  }
   

  return (
    <Container id='main-container' className='d-grid h-100'>
      <Form id='sing-in-form' className='text-center w-100'>
        <h1 className='mb-3'>Login</h1>
      <Form.Group>
        <Form.Control className='mb-3 mt-3' type='email' size='lg' placeholder='Email' autoComplete='username'/>
      </Form.Group>
      <Form.Group>
        <Form.Control type='password' size='lg' placeholder='Пароль' autoComplete='current-password'/>
      </Form.Group>
      <div className="d-grid">
          <Button onClick={handler} className='mt-3' variant="primary" size="lg">Вход</Button>
        </div>
      </Form>
    </Container>
    
  );
}

export default Login;