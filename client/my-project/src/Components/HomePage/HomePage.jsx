import React from 'react'
import HeroImage from "../../assets/images/HeroImage_1.jpg"
import Navbar from '../Common/Navbar'
import { NavLink } from 'react-router-dom'
import {apartmentData,landProperty} from "../../utils/dummyData"
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
import PlusIcon from "../../assets/plusIcon.svg"
import CustomAppartmentCard from '../Common/CustomAppartmentCard'
import CustomLandCard from '../Common/CustomLandCard'
import Footer from '../Common/Footer'
const HomePage = () => {

  const isAuth = useSelector(state => state.globlaStateSlice.address)
  const [propertyData,setAppartMentAddress] = React.useState(apartmentData)
  const [landPropertyData,setLandPropertyData] = React.useState(landProperty)
  React.useEffect(()=>{
    // add code here
  },[])

  const handleAppProperty = (e)=>{
    if(!isAuth){
      toast.error("Please Register Yourself")
    }
  }

  const apartmentPropertyCards = propertyData?.map((card)=>{
    return(
      <CustomAppartmentCard
      apartment = {card}
      
      />
    )
  })
  const LandPropertyCards = landPropertyData?.map((card)=>{
    return(
      <CustomLandCard
      land = {card}
      />
    )
  })
  return (
    <div>
      <Navbar />
      {/* <div className='flex items-end'>
        <NavLink>
          Profile
        </NavLink>
        <button 
          onClick={handleAppProperty}
          className='custom-border-button flex items-center'
        >
         <span> Add Property </span>
         <img
            src={PlusIcon}
            alt='plus-icon'
         />
        </button>
      </div> */}
      <div> 
        <h4 className='text-3xl ml-[15px] mb-[20px] text-black-500 font-extrabold'>Popular Properties</h4>
        <div className='flex flex-wrap align-start'>
        {
          apartmentPropertyCards && apartmentPropertyCards
        }
        </div>
      </div>
      <div className='mt-[20px]'> 
        <h4 className='text-3xl ml-[15px] mb-[20px] text-black-500 font-extrabold'>Popular Land Properties</h4>
        <div className='flex flex-wrap align-start'>
        {
          LandPropertyCards && LandPropertyCards
        }
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default HomePage