import React from 'react';
import axios from "axios";
import { DirectUpload } from "@rails/activestorage";
// import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import './css/Registration.css';
import Navbar from './Navbar'


const { createContext, useState, useContext } = require("react");

const UserContext = createContext();

const Registration =() =>  {
 
  // useEffect(() => {
  //   document.title = "Sign up for | Peeps";

  // }, [])

  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [avatar, setAvatar] = useState({});

  const  setUserData  = useContext(UserContext);

    
 const [open, setOpen] = React.useState(false);


 const handleClose = () => {
   setOpen(false);
 };

  

  const handleFirstName = (e) => {
   setFirstName(e.target.value)
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleAvatar = (event) => {
    setAvatar(event.target.files[0]);

    // console.log(event.target.files[0]);
  }






  const uploadFile = (file, user) => {
    const upload = new DirectUpload(file, 'https://ancient-caverns-87573.herokuapp.com/rails/active_storage/direct_uploads')
    upload.create((error, blob) => {
      if(error) {
        // console.log(error)
      }else {
        let res = axios
          .patch(`https://ancient-caverns-87573.herokuapp.com/users/${user.user.id}`, {
            auth: {
              avatar: blob.signed_id,
            },
          })

          .then(
            (response) => {
              // console.log(response.data);

              setTimeout(() => {
                window.location.reload();
              }, 3500);
              // history.push("/feed");
              handleClose()

            },

            (error) => {
              // console.log("Error", error);
            }
          );

        return res;

      }
    })
    


  }


  const handleSubmit = async (e) => {
    //  do stuff
    e.preventDefault();
    // setLoading(true)
   

    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };


    // console.log(data);

    let res = await axios
      .post("https://ancient-caverns-87573.herokuapp.com/users", {
        auth: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        },
      })
      .then(
        (response) => {
          // console.log(response.data);
          setOpen(true);


          uploadFile(avatar, response.data);

          setUserData({
            token: response.data.token.token,
            isLoggedIn: true,
            user: data,
          });
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.token.token)
          );
          localStorage.setItem("user", JSON.stringify(data));
              
          // setError(false);
          // setLoading(false);
        },
        (error) => {
          // console.log(error.response.data);
          console.log(error);

          // setError(true);
          // setLoading(false);

          // showAllErrors(error.response.data);
        }
      );

    return res;
    
  };




    return (
      <>
       
      <Navbar/>
      <div className="wrapped">
        <form onSubmit={handleSubmit} class="form-edit">
        <p className="h1 py-2 text-center">Register</p>
        <label for="exampleFormControlInput1" class="form-label">FirstName:</label>

        <input
            type="first_name"
            name="first_name"
            placeholder="First Name:"
            value={first_name}
            onChange={handleFirstName}
            required
          />
        <label for="exampleFormControlInput1" class="form-label">Last Name:</label>

          <input
            type="last_name"
            name="last_name"
            placeholder="Last Name:"
            value={last_name}
            onChange={handleLastName}
            required
          />
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
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            required
          />
          <p className="mt-2">
                      Kindly attach a government verification ID Card
                    </p>
                    <small style={{ color: "#2196F3" }}>
                      Accepts only (PDF, JPG and PNG FILES)
                    </small>

        <div className=" m-auto">
          <input
            placeholder="Upload File"
            className="custom"
            style={{ marginTop: "10px" }}
            name="avatar"
            onChange={handleAvatar}
            type="file"
            accept=".pdf, .png, .jpg"
            // required
            multiple={false}
          />
        </div>

        <p className="py-2">
          {/* already have an account? <Link to="/login">Login</Link> */}
        </p>
      

        <Button
          style={{ background: "#4CAF4F" }}
          variant="contained"
          color="secondary"
          type="submit"
          className="button"
          
        >
          Register
          
        </Button>

          

        </form>

      </div>   
      </>
    );
  
}

export default  Registration;