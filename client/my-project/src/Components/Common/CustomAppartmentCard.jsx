import React from 'react'
import { NavLink } from 'react-router-dom';
const CustomAppartmentCard = ({ apartment }) => {
    const { locationName, amount,propertyType, description, generalInformation, areaSize, no_of_rooms, no_of_bathrooms, images } = apartment;
    console.log(apartment) 
    return (
        <NavLink 
        to={"/property/123"}
        className="max-w-sm mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img className="h-48 w-full object-cover" src={images[0]} alt={locationName} />
                <div className="p-6">
                    <div className='flex justify-between items-center'>
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{propertyType}</div>
                        <span className='text-black customBadgeCSS'>{amount} ETH</span>
                    </div>
                    <div className="mt-2 text-xl leading-tight font-semibold">{locationName}</div>
                    <p className="mt-2 text-gray-500">{description}</p>
                    {/* <div className="mt-4">
            <p><span className="font-semibold">Area Size:</span> {areaSize}</p>
            <p><span className="font-semibold">Nearby Surroundings:</span> {generalInformation.nearbySurroundings}</p>
            <p><span className="font-semibold">Furnished:</span> {generalInformation.furnished ? 'Yes' : 'No'}</p>
            <p><span className="font-semibold"># of Rooms:</span> {no_of_rooms}</p>
            <p><span className="font-semibold"># of Bathrooms:</span> {no_of_bathrooms}</p>
          </div> */}
                </div>
            </div>
        </NavLink>
    )
}

export default CustomAppartmentCard