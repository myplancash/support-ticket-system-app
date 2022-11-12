import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch]) 


  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Please verify your password')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  if(isLoading) {
    return <Spinner />
  }

 
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              type="text"
              name='name'
              autoComplete="username"
              placeholder='Enter your name...'
              value={name}
              onChange={onChange}
              id='name'
              className='form-control'
              required
            />
          </div>
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
              required
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
              required
            />
          </div>
           <div className='form-group'>
            <input 
              type="password"
              name='password2'
              autoComplete="new-password"
              placeholder='Confirm your password...'
              value={password2}
              onChange={onChange}
              id='password2'
              className='form-control'
              required
            />
          </div>
          <div className="form-group">
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}


export default Register