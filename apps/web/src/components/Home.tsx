import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Home: FunctionComponent = () => {
  return (
    <div className="text-white">
      azeaze <Link to="/movies/664767">664767</Link>
    </div>
  );
};

export default Home;
