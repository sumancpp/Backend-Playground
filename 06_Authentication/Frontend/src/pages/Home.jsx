import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'

const Home = () => {
    let{userData,setUserData,serverUrl} = useContext(dataContext)

    const handleLogOut = async () => {
      try {
        let data = await axios.post(serverUrl + "/logout",{},{
          withCredentials:true
        })
        setUserData(null)
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='w-full h-screen bg-[#1a2d2c] flex items-center justify-center gap-5 flex-col'>

      {/* Image */}
          <div className="flex justify-center">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative border-2 border-white">
              <img
                src={userData.profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
     <p className='text-4xl text-white'>Hey, <span className='text-5xl text-[#08c3d8]'>{userData.firstName}</span></p>

     <button onClick={handleLogOut}
      className="bg-blue-500 text-white p-3 rounded-lg cursor-pointer"
      >
      Log out
      </button>

    </div>
  )
}

export default Home
