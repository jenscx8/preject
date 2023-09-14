// create a modal with a form in it that grabs all the data for a new instructor and submits it to the create route

// import react bootstrap
// import idk i need to turn this into a modal i can trigger

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';



export default function SignUpForm({ onSignup }) {
  const [emailValue, setEmailValue] = useState('');
  const [firstNameValue, setfirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [certificationValue, setCertificationValue] = useState('');
  const [bioValue, setValueBio] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  // location name bio certification

  return (
    // <form
    //   onSubmit={(e) => {
    //     onSignup(e, {
    //       email: emailValue,
    //       password: passwordValue,
    //       bio: bioValue,
    //       location: locationValue,
    //       certification: certificationValue,
    //       firstName: firstNameValue,
    //       lastName: lastNameValue
    //     });
    //   }}
    // >
    //   <label htmlFor="firstName">first name:</label>
    //   <input
    //     name="firstName"
    //     id="firstName"
    //     type="text"
    //     required
    //     onChange={(e) => setfirstNameValue(e.target.value)}
    //   />
    //   <label htmlFor="lastName">last name:</label>
    //   <input
    //     name="lastName"
    //     id="lastName"
    //     type="text"
    //     required
    //     onChange={(e) => setLastNameValue(e.target.value)}
    //   />
    //   <label htmlFor="location">location:</label>
    //   <input
    //     name="location"
    //     id="location"
    //     type="text"
    //     required
    //     onChange={(e) => setLocationValue(e.target.value)}
    //   />
    //   <label htmlFor="bio">bio:</label>
    //   <input
    //     name="bio"
    //     id="bio"
    //     type="text"
    //     required
    //     onChange={(e) => setValueBio(e.target.value)}
    //   />
    //   <label htmlFor="certification">Certifications:</label>
    //   <input
    //     name="certification"
    //     id="certification"
    //     type="text"
    //     required
    //     onChange={(e) => setCertificationValue(e.target.value)}
    //   />
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
    //   <button type="submit">create profile</button>
    // </form>
    
    <Form  onSubmit={(e) => {
          onSignup(e, {
            email: emailValue,
            password: passwordValue,
            bio: bioValue,
            location: locationValue,
            certification: certificationValue,
            firstName: firstNameValue,
            lastName: lastNameValue
          });
        }}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control  
        
        name="firstName"
        id="firstName"
        type="text"
        required
        onChange={(e) => setfirstNameValue(e.target.value)} 
        
        
        
        
        
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control  
        
        name="lastName"
        id="lastName"
        type="text"
        required
        onChange={(e) => setLastNameValue(e.target.value)} 
        
        
        
        
        
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control  
        
        name="location"
        id="location"
        type="text"
        required
        onChange={(e) => setLocationValue(e.target.value)} 
        
        
        
        
        
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control  
        
        name="bio"
        id="bio"
        type="text"
        required
        onChange={(e) => setValueBio(e.target.value)} 
        
        
        
        
        
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certifications</Form.Label>
        <Form.Control  
        
        name="certification"
        id="certification"
        type="text"
        required
        onChange={(e) => setCertificationValue(e.target.value)} 
        
        
        
        
        
        />
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control  
        
        name="email"
        id="email"
        type="text"
        required
        onChange={(e) => setEmailValue(e.target.value)} 
        
        
        
        
        
        />
      </Form.Group>




      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password"
        id="password"
        type="password"
        required
        onChange={(e) => setPasswordValue(e.target.value)} />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>






  );
}