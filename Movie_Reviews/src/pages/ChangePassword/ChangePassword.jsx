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
        
    }
}