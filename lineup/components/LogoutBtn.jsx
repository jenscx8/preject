import Button from "react-bootstrap/esm/Button";

export default function LogoutButton({ onLogout }) {
    return (
      <form onSubmit={onLogout}>
        <Button type="submit">Log Out</Button>
      </form>
    );
  }

  // style this or something better 