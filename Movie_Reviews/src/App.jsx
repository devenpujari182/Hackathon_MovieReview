
import './App.css'
import { ToastContainer } from 'react-toastify'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import EditProfile from './pages/EditProfile/EditProfile'

import {Route,Routes} from 'react-router-dom'


function App() {

  return (
    <div>
      <Routes>
        <Route
        path='/'
        element={<SignIn/>}
        />
        <Route
        path='signup'
        element={<SignUp/>}
        />
        <Route
        path='editProfile'
        element={<EditProfile/>}
        />
      </Routes>

      <ToastContainer/>
    </div>
  )
}

export default App
