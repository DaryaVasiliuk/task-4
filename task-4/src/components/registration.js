import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../index.css';
import '../App.css';
import { useState } from 'react';

function Registration() {
   const [name, setName] = useState([]);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

const handler = (event)=> {
  event.preventDefault();
  console.log(name, email, password)
  fetch('http://localhost:4000/registration', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
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

const saveName = (e) => {
  setName(e.target.value);
}

const saveEmail = (e) => {
  setEmail(e.target.value);
}

const savePassword = (e) => {
  setPassword(e.target.value);
}

  return (
    <Container id='main-container' className='d-grid h-100'>
      <Form id='sing-in-form' className='text-center w-100'>
        <h1 className='mb-3'>Регистрация</h1>
      <Form.Group>
        <Form.Control  type='name' size='lg' placeholder='Имя' autoComplete='username' onChange={saveName}/>
      </Form.Group>
      <Form.Group>
        <Form.Control className='mb-3 mt-3' type='email' size='lg' placeholder='Email' autoComplete='username' onChange={saveEmail}/>
      </Form.Group>
      <Form.Group>
        <Form.Control type='password' size='lg' placeholder='Пароль' autoComplete='current-password' onChange={savePassword}/>
      </Form.Group>
      <div className="d-grid">
          <Button onClick={handler} className='mt-3' variant="primary" size="lg">Зарегестрироваться</Button>
        </div>
      </Form>
    </Container>
    
  );
}

export default Registration;
