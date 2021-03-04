import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message'
import { showLoading } from '../helpers/loading'
import { signup } from '../api/auth';
import { isAuthenticated } from '../helpers/auth';

const Signup = () => {

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push('/admin/dashboard');

    }else if((isAuthenticated() && isAuthenticated().role === 0)) {
      history.push('/user/dashboard');
    }
  }, [history])


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
    password2: '',
    successMsg: false,
    errorMsg: false,
    loading: false,
  })
  const {
    username,
    email,
    phonenumber,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: '',
      successMsg: '',
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(phonenumber) ||
      isEmpty(password) ||
      isEmpty(password2)
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
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: 'Password donot match',
      })
    } else {
      const { username, email, phonenumber, password } = formData
      const data = { username, email, phonenumber, password }
      setFormData({
        ...formData,
        loading: true,
      })
      signup(data)
        .then((response) => {
          console.log('Axios signup error', response)
          setFormData({
            username: '',
            email: '',
            phonenumber: '',
            password: '',
            password2: '',
            loading: false,
            successMsg: response.data.successMessage,
          })
        })
        .catch((error) => {
          console.log('Axios signup error', error)
          setFormData({
            ...formData,
            loading: false,
            errorMsg: error.response.data.errorMessage,
          });
        })
    }
  }

  const showSignUpForm = () => (
    <form className="form-Container" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label for="exampleInputPassword1">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>
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
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          value={phonenumber}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Phone Number"
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
      <div className="form-group">
        <label for="exampleInputPassword1"> Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Re-Enter Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-warning btn-block">
        SignUp
      </button>
      <p className="text-center text-dark">
        Have an account? <Link to="/signin">Log In</Link>
      </p>
    </form>
  )

  return (
    <div className="signup-container">
      <div className="row px-3 vh-50">
        <div className="col-md-5 mx-auto align-self-center">
          <div className="text-center">
            <h1>AGB - BANK</h1>
            <p>New Technology And New Era Of Data Flow. Be Safe Of Your Data.</p>
            {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && showLoading()}
          </div>

          {showSignUpForm()}
        </div>
      </div>
    </div>
  )
}

export default Signup
