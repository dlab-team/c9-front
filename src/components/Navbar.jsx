import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navbar;
