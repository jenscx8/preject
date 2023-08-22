// render the profile based of the req.params

//profile header

//instructor name component

//profile photo component

//bio component

//certification component

//location component
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import EditForm from './EditForm';
import DeleteBtn from './DeleteBtn'

export default function YourProfilePage() {
  const {
    instructor: { firstName, lastName, bio, location, certification, email, password },
  } = useLoaderData();

  const navigate = useNavigate();

  const handleEdit = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/edit', formData);

    navigate('/instructors')

  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/delete');
   
      navigate('/instructors');
    
  };
  return (
    <>
      <h1>{firstName} {lastName}</h1>
      
      <p>{bio}</p><p>{location}</p><p>{certification}</p><p>{email}</p><p>{password}</p>

      <EditForm onEdit={handleEdit} />
      <DeleteBtn onDelete={handleDelete} />
    </>

  );
}


// create an edit profile button
// this will trigger a modal that has an input for bio location and certification 
// upon submit this will trigger the edit route and save the new info to the database
// then redirect back to the page