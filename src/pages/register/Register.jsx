import "./register.scss";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div className="register">
        
        <div className="card">
          <div className="left">
            <h1>Register</h1>
            <form>
              <input type="text" placeholder="Username"/>
              <input type="email" placeholder="Email"/>
              <input type="password" placeholder="Password"/>
              <input type="text" placeholder="Name"/>
              <button>Register</button>
            </form>
          </div>

          <div className="right">
            <h1>Social Hub.</h1>
            <p>
              Delve into the world of socialization, explore diverse 
              social activities based on your preferences
            </p>
            <span>Do you have an account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>

        </div>
    </div>
  )
}

export default Register;