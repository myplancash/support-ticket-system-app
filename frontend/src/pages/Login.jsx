import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const { email, password } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch]) 


  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  if(isLoading) {
    return <Spinner />
  }

  
  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login for Support
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input 
              type="email"
              name='email'
              autoComplete="username"
              placeholder='Enter your email...'
              value={email}
              onChange={onChange}
              id='email'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <input 
              type="password"
              name='password'
              autoComplete="new-password"
              placeholder='Enter your password...'
              value={password}
              onChange={onChange}
              id='password'
              className='form-control'
            />
          </div>
          <div className="form-group">
            <button className='btn btn-block' >Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}


export default Login