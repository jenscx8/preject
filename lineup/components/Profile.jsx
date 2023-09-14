// render the profile based of the req.params

//profile header

//instructor name component

//profile photo component

//bio component

//certification component

//location component

import { useLoaderData } from 'react-router-dom';
import ReviewForm from './ReviewForm';

export default function Profile() {
  const {
    instructor: { firstName, lastName, bio, location, certification },
  } = useLoaderData();
  // handle review here

  return (
    <>
      <h1>{firstName} {lastName}</h1>
      
      <p>{bio}</p><p>{location}</p><p>{certification}</p>
      <ReviewForm />
    </>
  );
}


// create a leave review button that will trigger a form
// to leave a review 

// see if we can map a list of certifications in a nice compponent 
// then do the same with contact info

// if they leave a reiview take them to a page where they can leave another tip
