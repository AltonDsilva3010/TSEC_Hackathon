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
import { dataLength } from 'ethers'
const HomePage = () => {

  const isAuth = useSelector(state => state.globlaStateSlice.address)
  const [propertyData,setAppartMentAddress] = React.useState(apartmentData)
  const [landPropertyData,setLandPropertyData] = React.useState(landProperty)
  const globalState = useSelector((state) => state.globlaStateSlice);
  console.log("GLOBAL IN REGISTRAION ", globalState);
  const isLoggedIn = useSelector(state => state.globlaStateSlice.isLoggedIn)


  React.useEffect(()=>{

      const getData = async () => {
      
          const {contract} = globalState;

          console.log("Contract : " , contract)

          try{
          const transaction = await contract.getAllListingsApt()
          return transaction;
        }
          catch (error){
            console.log(error)
          }
          
      }

      getData().then((data) => {
        console.log(data.length)
        console.log(data[0].length)
        const newArray = [];
        for(var i = 0 ; i < data.length ; i++){
          let obj = {
            id : data[i][0],
            address : data[i][1],
            areaSize : data[i][2] + data[i][3],
            description : data[i][4],
            images : [data[i][5]],
            amount : parseInt(data[i][6]),
            no_of_rooms : data[i][8],
            parkSpace : data[i][9]
          }

          newArray.push(obj)
        }

        setAppartMentAddress(newArray);

        console.log(propertyData)
        
      })

      const getLandData = async () => {
      
          const {contract} = globalState;

          console.log("Contract : " , contract)

          try{
          const transaction = await contract.getAllListingsApt()
          console.log(transaction)
          return transaction;
        }
          catch (error){
            console.log(error)
          }
          
      }

      getLandData().then((data) => {
        console.log(data.length)
        console.log(data[0].length)
        const newArray = [];
        for(var i = 0 ; i < data.length ; i++){
          let obj = {
            id : data[i][0],
            address : data[i][1],
            area_size : data[i][2] + data[i][3],
            description : data[i][4],
            images : [data[i][5]],
            amount : parseInt(data[i][6]),
          }

          newArray.push(obj)
        }

        setLandPropertyData(newArray);
        
      })
  },[isLoggedIn])

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