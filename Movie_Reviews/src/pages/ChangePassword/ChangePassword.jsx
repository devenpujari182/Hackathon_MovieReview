import React, { useState } from 'react'
import './ChangePassword.css'
import { changePassword } from '../../services/users'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function ChangePassword(){
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate=useNavigate()

    const onChangePassword=async()=>{
    if (password.length == 0) {
      toast.warning('please enter current password')
    } 
    else if (newPassword.length == 0) {
      toast.warning('please enter new password')
    }
    else if (confirmPassword.length == 0) {
      toast.warning('please confirm password')
    }
     else if (newPassword != confirmPassword) {
      toast.warning('password does not match')
    }else {
      const response = await changePassword(
        password,
        newPassword,
        confirmPassword
      )
      if (response['status'] === 'success') {
        toast.success('Successfully changed password')

      } else {
        toast.error(response['error'])
      }
    }
    }

    return(
        <div className='container'>
            <h2 className='page-header'>Change Password</h2>
            <div className='changePassword-container'>
              <div className='mb-3'>
                <label htmlFor=''>Current Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  className='form-control'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor=''>New Password</label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type='password'
                  className='form-control'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor=''>Confirm Password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type='password'
                  className='form-control'
                />
              </div> 

              <div>
                <button
                  onClick={onChangePassword}
                  className='btn btn-success'
                >
                  Change Password
                </button>
              </div> 
            </div>
        </div>
    )
}

export default ChangePassword