import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await register(inputs);
    
    if (result.success) {
      // Redirect to home or dashboard after successful registration
      navigate("/");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            <input 
              type="email" 
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <input 
              type="text" 
              placeholder="Full Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
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
  );
};

export default Register;