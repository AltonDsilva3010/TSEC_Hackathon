import React from 'react'
import Header from '../Common/Header'
import HeroImage from "../../assets/images/RoomImage.jpg"

const UserDashboard = () => {
  return (
    <div>
      <Header/>
      <div className='relative'>
        <div >
            <img
              src={HeroImage} 
              alt='hero image'
              className='w-full h-[400px] object-fill'
            />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard