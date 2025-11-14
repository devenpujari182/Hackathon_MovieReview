import React, { useState } from 'react'
import './EditProfile.css'
import { editProfile } from '../../services/users'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'


function EditProfile(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [dob,setDob]=useState('')

    const navigate = useNavigate()

    const onEditProfile=async()=>{
    if (firstName.length==0){
        toast.warning('plz enter first name')
    }
     else if (lastName.length == 0) {
      toast.warning('please enter last name')
    } else if (email.length == 0) {
      toast.warning('please enter email')
    } else if (mobileNo.length == 0) {
      toast.warning('please enter phone number')
    } else if (dob.length == 0) {
      toast.warning('please enter ur date of birth')
    }
     else {
      const response = await editProfile(
        firstName,
        lastName,
        email,
        mobileNo,
        dob,
      )
      if (response['status'] === 'success') {
        toast.success('Successfully edited profile')
      } else {
        toast.error(response['error'])
      }
    }

}

return(
    <div className='container'>
        <h2 className='page-header'>Edit Profile</h2>
        <div className='editProfile-container'>
            <div class="row g-3" >
                <div class="col-md-6">
					<label class="form-label">First Name</label>
					<input 
                    onChange={(e)=>setFirstName(e.target.value)}
                    type="text" class="form-control" placeholder="" aria-label="First name" value="Scaralet"/>
				</div>
				
				<div class="col-md-6">
					<label class="form-label">Last Name</label>
					<input
                    onChange={(e)=>setLastName(e.target.value)}
                    type="text" class="form-control" placeholder="" aria-label="Last name" value="Doe"/>
				</div>
            </div>
            <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Mobile Number</label>
          <input
            onChange={(e) => setMobileNo(e.target.value)}
            type='tel'
            className='form-control'
          />
        </div>

            <div className='mb-3'>
                <label htmlFor=''>DateOfBirth</label>
                <input
                    onChange={(e) => setDob(e.target.value)}
                    type='date'
                    className='form-control'
                />
            </div>

        <div>
          <button
            onClick={onEditProfile}
            className='btn btn-success'
          >
            Save Changes
          </button>
        </div>

        </div>
    </div>
)

}

export default EditProfile