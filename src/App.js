import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import './App.css';

function App() {

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    var preAuth = window.localStorage.getItem(auth)
    if (preAuth !== null) {
      setAuth(preAuth)
    }
  }, [])

  return (
    <div className="App">
      <Routes>

        {auth ? <>
          {/* 登录后的路由 */}
          <Route path='/home' element={<Home changeAuth={setAuth}></Home>}></Route>
          <Route path="*" element={<Navigate to='home' />} />
        </>
          : <>
            {/* 未登录时的路由 */}
            <Route path='/login' element={<Login changeAuth={setAuth}></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path="*" element={<Navigate to='login' />}></Route>
          </>}

      </Routes>
    </div>
  );
}

export default App;
