import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SignUpForm from './SignUpForm';

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/instructors/create', formData);

    navigate('/instructors')
  };

  return (
    <>
      <h1>sign up</h1>
      <SignUpForm onSignup={handleSignUp} />
    </>
  );
}
