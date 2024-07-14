import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeScreen, LoginScreen, RegisterScreen } from './features/account';
import {ReviewPanel} from './features/reviews';



function App() {
  return (
    <Router>
     <Routes>
      <Route  path='/' Component={HomeScreen} />
      <Route path='/register' Component={RegisterScreen}/>
      <Route path='/login' Component={LoginScreen}/>
      <Route path='/panel' Component={ReviewPanel}/>

     </Routes>

      
    </Router>
  )
}

export default App
