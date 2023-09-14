import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginForm({ onLogin }) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    // <form
    //   onSubmit={(e) => {
    //     onLogin(e, {
    //       email: emailValue,
    //       password: passwordValue,
    //     });
    //   }}
    // >
    //   <label htmlFor="email">Email:</label>
    //   <input
    //     name="email"
    //     id="email"
    //     type="text"
    //     required
    //     onChange={(e) => setEmailValue(e.target.value)}
    //   />
    //   <label htmlFor="password">Password:</label>
    //   <input
    //     name="password"
    //     id="password"
    //     type="password"
    //     required
    //     onChange={(e) => setPasswordValue(e.target.value)}
    //   />
    //   <button type="submit">Log In</button>
    // </form>

    <Form onSubmit={(e) => {
      onLogin(e, {
        email: emailValue,
        password: passwordValue,
      });
    }}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email"
        id="email"
        type="text"
        required
        onChange={(e) => setEmailValue(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password"
        id="password"
        type="password"
        required
        onChange={(e) => setPasswordValue(e.target.value)} />
      </Form.Group>
      <Button type="submit">Log In</Button>
    </Form>
  );
}

// i think this is good and should work for all logins
// doesnt need the control id 

