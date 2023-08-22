// trigger delete instructor route 
// exprt default function delete
export default function DeleteBtn({ onDelete }) {
    return (
      <form onSubmit={onDelete}>
        <button type="submit">Delete Profile</button>
      </form>
    );
  }