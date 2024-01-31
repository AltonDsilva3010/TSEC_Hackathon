import React from 'react'
import { useParams } from 'react-router-dom'
import LandImage from "../../assets/images/landImages.jpg"
import RoomImage from "../../assets/images/RoomImage.jpg"
import Bath from "../../assets/Bath.png"
import Room from "../../assets/Room.png"
import AreaSize from "../../assets/AreaSize.png"
import { Carousel } from 'react-responsive-carousel';
import Location from "../../assets/location.png"
import Header from './Header'
import Footer from './Footer'
const DisplayPropertyPage = () => {
    let { id } = useParams();

    const [apartment, setDetails] = React.useState({
        locationName: "Suburban Apartment",
        propertyType: "Apartment",
        amount : "30",
        description: "Spacious apartment in a quiet suburban neighborhood.",
        areaSize: "1200 sqft", // Added areaSize field
        no_of_rooms: 3,
        address: "123 Farm Road",
        no_of_bathrooms: 2,
        images: [RoomImage,LandImage]
      })

    const images = apartment.images?.map((i) => {
        return (
            <img src={i} className='h-[500px] w-full object-obtain' />
        )
    })
    React.useEffect(() => {
        // contract call for getting data
    }, [])
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 mt-[20px]">
                <header className="text-2xl font-semibold mb-4">Apartment Details</header>

                <div className="bg-white rounded-xl mb-[30px] overflow-hidden">
                    <div>
                        <Carousel showThumbs={false} autoPlay>
                            {images}
                        </Carousel>
                    </div>
                    <div className="p-4">
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <img src={Location} alt='location-icon' className='w-[40px] mr-[10px]' />
                                <div>
                                    <div className="text-2xl font-bold">{apartment.locationName}</div>
                                    <p className='text-lg text-gray-5'>{apartment.address}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>

                                <div className='text-2xl font-bold mr-[10px]' >{apartment.amount} ETH</div>
                                <button className='text-bold text-2xl bg-indigo-500 text-white w-[100px] h-[50px] rounded-md'>Buy</button>
                            </div>
                        </div>
                        <div className="flex justify-center mt-[20px] mb-[20px]">
                            <div className="flex justify-around w-[85%] rounded-md  p-[20px] bg-slate-100">
                                {
                                    apartment.no_of_rooms &&
                                    <div className='flex flex-col items-center'>
                                        <img src={Room} alt="room icon" className='w-[50px] mb-[8px]' />
                                        <span className='font-semibold'>No. of Rooms : {apartment.no_of_rooms} </span>
                                    </div>
                                }
                                {apartment.no_of_bathrooms &&
                                    <div className='flex flex-col items-center'>
                                        <img src={Bath} alt="bathrooms icon" className='w-[50px] mb-[8px]' />
                                        <span className='font-semibold'>No. of BathRooms : {apartment.no_of_bathrooms}</span>
                                    </div>
                                }
                                {apartment.areaSize &&
                                    <div className='flex flex-col items-center'>
                                        <img src={AreaSize} alt="areaSize icon" className='w-[50px] mb-[8px]' />
                                        <span className='font-semibold'>Area Size : {apartment.areaSize}</span>
                                    </div>
                                }
                            </div>

                        </div>
                        <p className="text-gray-5   00 mb-4 ">{apartment.description}</p>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DisplayPropertyPage