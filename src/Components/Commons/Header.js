import React, { useEffect, useState } from 'react'
import './header.css'
import logo from '../Images/logo2.png'
import { useUser } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { RiMenu2Line } from "react-icons/ri";
import {AnimatePresence, motion} from 'framer-motion'

const Header = () => {

  const {user,logout} = useUser()
  const navigate = useNavigate()

  useEffect(()=>{
    
  },[user])

  const handleLogout = () => {
    logout()
    navigate('/sign-in')
    window.location.reload()
  }

  const [menus,setMenus] = useState(false)

  return (
    <div>
    <div className='flex align-center justify-between gap-2 items-center p-6 md:pl-10 md:pr-10 text-1xl border-b bg-white border-gray-200'>
      <div className='flex items-center gap-2'>
        <img src={logo} className='h-7'/>
        <h3 style={{fontSize:'16px',fontWeight:'bold'}}>Zervings</h3>
      </div>
      <div className='flex items-center gap-10'>
        <div>
        <p>Zervings Your Place</p></div>
        {user?
        <div>
          <div className='lg:hidden'>
            <p onClick={()=>setMenus(!menus)} className='cursor-pointer'><RiMenu2Line /></p>
          </div>
        <div className='hidden lg:flex items-center gap-10 '>
          <div>
            <p className='cursor-pointer' onClick={()=>navigate("/dashboard")}>Dashboard</p>
          </div>
        <div className='flex items-center gap-3 border border-none p-[6px] pr-2 pl-2 rounded-xl text-white bg-black cursor-pointer'>
          <img src={user.avatar} alt='avatar' className='h-[35px] m-0 rounded-[20px]'/>  
          <p>{user.firstname}</p>
        </div>
        <div>
          <p onClick={handleLogout} className='cursor-pointer'>Logout</p>
        </div>
        </div></div>:<div className='flex items-center gap-10'>
          <p className='cursor-pointer' onClick={()=>navigate('/register')}>Sign up</p>
          <p className='cursor-pointer' onClick={()=>navigate('/sign-in')}>Log in</p>
        </div>}
        
      </div>
    </div>
     <AnimatePresence>
        {menus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden bg-white p-4 shadow-md"
          >
            {user ? (
              <div className="flex flex-col mt-7 pb-7 items-center gap-10">
                <p className="cursor-pointer" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </p>
                <div className="flex items-center gap-3 border border-none p-[6px] pr-2 pl-2 rounded-xl text-white bg-black cursor-pointer">
                  <img src={user.avatar} alt="avatar" className="h-[35px] m-0 rounded-[20px]" />
                  <p>{user.firstname}</p>
                </div>
                <p onClick={handleLogout} className="cursor-pointer">Logout</p>
              </div>
            ) : (
              <div className="flex items-center gap-10">
                <p className="cursor-pointer" onClick={() => navigate('/register')}>Sign up</p>
                <p className="cursor-pointer" onClick={() => navigate('/sign-in')}>Log in</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
