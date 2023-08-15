// render the profile based of the req.params

//profile header

//instructor name component

//profile photo component

//bio component

//certification component

//location component

import { useLoaderData } from 'react-router-dom';

export default function YourProfilePage() {
  const {
    instructor: { firstName, lastName, bio, location, certification, email, password },
  } = useLoaderData();

  return (
    <>
      <h1>{firstName} {lastName}</h1>
      
      <p>{bio}</p><p>{location}</p><p>{certification}</p><p>{email}</p><p>{password}</p>
    </>
  );
}


// create an edit profile button
// this will trigger a modal that has an input for bio location and certification 
// upon submit this will trigger the edit route and save the new info to the database
//