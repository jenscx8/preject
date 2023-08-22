// render the profile based of the req.params

//profile header

//instructor name component

//profile photo component

//bio component

//certification component

//location component

import { useLoaderData } from 'react-router-dom';

export default function Profile() {
  const {
    instructor: { firstName, lastName, bio, location, certification },
  } = useLoaderData();

  return (
    <>
      <h1>{firstName} {lastName}</h1>
      
      <p>{bio}</p><p>{location}</p><p>{certification}</p>
    </>
  );
}


// create a leave review button that will trigger a form
// to leave a review 