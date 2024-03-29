import React from 'react'
import { NavLink } from 'react-router-dom';

const CustomLandCard = ({ land }) => {
  const {id , address, amount, area_size, description,propertyType, nearbySurroundings, state, pincode, images } = land;
  return (
    
      <NavLink 
        to={`/property/${id}`}
        className="max-w-sm mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img className="h-48 w-full object-cover" src={images[0]}  />
          <div className="p-6">
            <div className="text-xl leading-tight font-semibold">{address}</div>
            <div className='flex justify-between items-center'>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Land</div>
              <span className='text-black customBadgeCSS'>{amount} ETH</span>
            </div>
            <p className="mt-2 text-gray-500">{description}</p>
            {/* <div className="mt-4">
            <p><span className="font-semibold">Area Size:</span> {area_size}</p>
            <p><span className="font-semibold">Nearby Surroundings:</span> {nearbySurroundings}</p>
            <p><span className="font-semibold">Location:</span> {address}, {state}, {pincode}</p>
          </div> */}
          </div>
        </div>
      </NavLink>
    
  )
}

export default CustomLandCard