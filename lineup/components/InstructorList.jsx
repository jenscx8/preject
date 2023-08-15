// await instructor data and render it in a list
import { Link, useLoaderData } from 'react-router-dom';



export default function InstructorList() {
    const { instructors } = useLoaderData()

    const instructorListItems = instructors.map(({ instructorId, firstName }) => (
        <li key={instructorId}>
        <Link to={`/instructors/${instructorId}`}>{firstName}</Link>
        </li>
      ));
    return (
      <>
        <h1>instructor list</h1>
        <ul>{instructorListItems}</ul>
      </>
    );
  }