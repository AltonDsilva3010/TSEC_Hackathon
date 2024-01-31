import React from 'react'
import HeroImage from "../../assets/images/HeroImage_1.jpg"
const HomePage = () => {
  return (
    <div>
      <div className='relative'>
        <img
          src={HeroImage}
          className='background-tint'
        />
        <div 
          className='absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%]'>
          <h3 className='text-[50px] font-bold text-center'>
            Every Home has Potential to inspire
          </h3>
          <div className='text-center mt-[20px]'>
            <button className='custom-button mr-[10px]'>
              Connect Wallet
            </button>
            <button className='custom-button'>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage