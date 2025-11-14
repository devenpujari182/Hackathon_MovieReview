import axios from 'axios'
import {config} from './config'

export async function signup(firstName,lastName,email,mobileNo,dob,password){
    try{
        const url=`${config.server}/user/signup`

        const body={firstName,lastName,email,mobileNo,dob,password}

        const response=await axios.post(url,body)

        return response.data
    }
    catch(ex){
        console.log(`exception:`,ex)
    }
}

export async function signin(email, password) {
  try {
    // create url
    const url = `${config.server}/user/signin`

    // create body
    const body = { email, password }

    // send the POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function editProfile(firstName,lastName,email,mobileNo,dob){
    try{
        const url = `${config.server}/user/editprofile`

    // create body
    const body = { firstName,lastName,email,mobileNo,dob}

    // send the POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
    }
    catch(ex){
        console.log(`exception: `, ex)
    }
}