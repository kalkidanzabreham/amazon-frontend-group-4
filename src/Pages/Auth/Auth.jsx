import React, { useContext, useState } from 'react'
import classes from "./auth.module.css"
import { Link, useLocation, useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../Utility/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { TYPE } from '../../Utility/action.type';
import {ClipLoader} from "react-spinners"

function Auth() {
  const [{user},dispatch] = useContext(DataContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location);
  const [loading,setLoading] = useState({
    signin:false,
    signup:false
  }
    
  )
  // console.log(user);
  // console.log(error);
  const authHandler = async (e) =>{
    e.preventDefault()
    if(e.target.name == "signin"){
      setLoading({...loading,signin:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
          type:TYPE.SET_USER,
          user:userInfo.user
        })
        setLoading({ ...loading, signin: false })
        navigate( 
          location?.state?.redirect ||"/")
      }).catch((err)=>{
        setError(err.message)
        setLoading({ ...loading, signin: false });
      })
    }else{
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
         dispatch({
           type: TYPE.SET_USER,
           user: userInfo.user,
         })
         setLoading({ ...loading, signup: false })
         navigate(location?.state?.redirect || "/");
      }).catch((err)=>{
        setError(err.message)
        setLoading({ ...loading, signup: false });
      })
    }
  }
  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {location?.state?.message && <small
        style={{
          color:'red',
          padding:"5px",
          fontWeight:"bold",
          textAlign:"center"
        }}
        >{location?.state?.message}</small>}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            onClick={authHandler}
            name="signin"
            type="submit"
            className={classes.login_signInButton}
          >
            {loading.signin ? <ClipLoader size={15} /> : "Sign In"}
          </button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create account button  */}
        <button
          onClick={authHandler}
          name="signup"
          type="submit"
          className={classes.login_registerButton}
        >
          {loading.signup ? (
            <ClipLoader size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth