import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from "../api/auth";
import { isAuthenticated, setAuthentication } from "../helpers/auth";
import { showLoading } from "../helpers/loading";
import { showErrorMsg } from "../helpers/message";

const Signin = () => {

    const history = useHistory();

    useEffect(() => {
      if (isAuthenticated() && isAuthenticated().role === 1) {
        history.push('/admin/dashboard');

      }else if((isAuthenticated() && isAuthenticated().role === 0)) {
        history.push('/user/dashboard');
      }
    }, [history]);

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      errorMsg: false,
      loading: false,
    })
    const {
      email,
      password,
      errorMsg,
      loading,
    } = formData;

    const handleChange = (evt) => {
      setFormData({
        ...formData,
        [evt.target.name]: evt.target.value,
        errorMsg: '',
      })
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();

      if (
        isEmpty(email) ||
        isEmpty(password)
      ) {
        setFormData({
          ...formData,
          errorMsg: 'All feilds are required',
        })
      } else if (!isEmail(email)) {
        setFormData({
          formData,
          errorMsg: 'Email is Invalid',
        })
      }  else {
        const { email, password } = formData
        const data = { email, password }
        setFormData({
          ...formData,
          loading: true,
        })
        signin(data)
          .then((response) => {
            setAuthentication(response.data.token, response.data.user);
            if (isAuthenticated() && isAuthenticated().role === 1) {
              console.log("redirect to admin dashboard");
              history.push('/admin/dashboard');

            }else {
              console.log("redirect to user dash board");
              history.push('/user/dashboard');
            }
          })
          .catch((error) => {
            console.log('signin api function errr', error);
            setFormData({
              ...formData,
              loading: false,
              errorMsg: error.response.data.errorMessage
            })
          });
      }
     
    }

  const showSignInForm = () => (
    <form className="form-Container" onSubmit={handleSubmit}>
      <div className="form-group">
      <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          value={email}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
        
          type="password"
          name="password"
          value={password}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-warning btn-block">
        SignIn
      </button>
      <p className='text-center text-dark'>
               Don't Have an account? <Link to='/signup'>SignUp</Link>
            </p>
    </form>
  );

  return (
    <div className="signup-container">
      <div className="row px-3 vh-50">
        <div className="col-md-5 mx-auto align-self-center">
          <div className="text-center">
            <h1>AGB - BANK</h1>
            <p>New era and new technology of money transfer.</p>
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && showLoading()}
          </div>

          {showSignInForm()}
        </div>
      </div>
    </div>
  );
};

export default Signin;
