import React, { useState } from 'react'
import './SignIn.css'
import { toast } from 'react-toastify'
import { signin } from '../../services/users'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
  // add the state members for inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get navigate function reference
  const navigate = useNavigate()

  // click event handler of Login button
  const onSignIn = async () => {
    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      const response = await signin(email, password)
      if (response['status'] == 'success') {
        toast.success('signed in successful')

        // get the token from response and cache it in local storage
        localStorage.setItem('token', response['data']['token'])
        localStorage.setItem('firstName', response['data']['firstName'])
        localStorage.setItem('lastName', response['data']['lastName'])

        // navigate to the PropertyListing page
        navigate('movies')
      } else {
        toast.error(response['error'])
      }
    }
  }

  return (
    <div className='container'>
      <h2 className='page-header'>SignIn</h2>

      <div className='signin-container'>
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type='email'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <input
            type='checkbox'
            className='me-2'
          />
          <label htmlFor=''>Remember me</label>
        </div>
        <div className='mb-3'>
          {/* <button className='btn btn-link'>Forgot password?</button> */}
          Don't have an account yet? <Link to='/signup'>Sign Up here</Link>
        </div>
        <div className='mb-3'>
          <button
            onClick={onSignIn}
            className='btn btn-success'
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
