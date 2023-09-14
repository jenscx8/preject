// trigger delete instructor route 
// exprt default function delete
import Button from "react-bootstrap/esm/Button";
export default function DeleteBtn({ onDelete }) {
    return (
      <form onSubmit={onDelete}>
        <Button type="submit">Delete Profile</Button>
      </form>
    );
  }