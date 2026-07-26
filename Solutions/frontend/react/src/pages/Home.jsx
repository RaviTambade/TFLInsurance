import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="jumbotron text-center">
        <h1>TFL Insurance Pvt. Ltd</h1>
        <p>Join our trusted brand and protect your future with fast, reliable coverage.</p>

       
          <Link type="button" to="/Login" className="btn btn-primary">Login</Link>
          <Link type="button" to="/RegisterCustomer" className="btn btn-secondary">Register</Link>
        </div>
      </div>
   
  );
}

export default Home;