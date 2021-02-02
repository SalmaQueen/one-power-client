import React from "react";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import './css/Registration.css';
import Navbar from './Navbar'


const { createContext, useState, useContext } = require("react");

const UserContext = createContext();

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };






  // const history = useHistory();

  const setUserData= useContext(UserContext);



  
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  
  

  

  const handleSubmit = async (e) => {
    //  do stuff
    e.preventDefault();
    


    const data = {
      email: email,
      password: password
    }




  let res = await axios
    .post("https://ancient-caverns-87573.herokuapp.com/login", {
      auth: {
        email: email,
        password: password,
      },
    })
    .then(
      (response) => {
        setUserData({
          token: response.data.jwt,
          isLoggedIn: true,
          user: data,
        });
        localStorage.setItem("token", JSON.stringify(response.data.jwt));
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
          window.location.reload();
        }, 3500);
       
      },
      (error) => {
        // console.log(error.message);
        handleClick();
       
      }
    );

    return res
    

  };
  

  return (
    <>
        <Navbar/>
        <div className="wrapped">
                <form onSubmit={handleSubmit} className="form-edit">
                <label for="exampleFormControlInput1" class="form-label">Email:</label>

                   <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            required
          />
       <label for="exampleFormControlInput1" class="form-label">Password:</label>

             <input
            name="password"
            type="password"
            label="Password"
            value={password}
                    onChange={handlePassword}
            required
          />
                

                 

                  {/* <p className="py-2">
                    don't have an account? <Link to="/signup">Signup</Link>
                  </p> */}
                

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ background: "#4CAF4F" }}
                    type="submit"
                    className='button'
                  >
                    Submit
                   
                  </Button>
                </form>
                
        </div>
              
              
    </>
  );
};

export default Login;
