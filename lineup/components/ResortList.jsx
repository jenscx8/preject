// await resort data and render it in a list
// fix typos 
// figure out how to put this in a drop down
import { Link, useLoaderData } from 'react-router-dom';

export default function ResortLIst() {
    const { resorts } = useLoaderData()

    const resrotListItems = resorts.map(({ resortId, location }) => (
        <li key={resortId}>
        <Link to={`/instructors/${resortId}`}>{location}</Link>
        </li>
      ));
    return (
      <>
        <h1>resort list</h1>
        <ul>{resrotListItems}</ul>
      </>
    );
  }


