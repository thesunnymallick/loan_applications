import React from 'react'
import mobileApp from "../../assets/mobileApp.png"
const MobileAppAdd = () => {
  return (
    <div className=' bg-green-700 
     bg-gradient-to-b from-green-800 w-full h-[52vh] my-8 p-6 overflow-hidden '
    >
        <div className=' container mx-auto flex justify-center items-center px-1'>
            <div className=' w-[50%] flex flex-col gap-4 text-white'>
               <h1 className='text-4xl font-semibold'>Top Mobile & Web Development Company</h1>
               <p className=''>GROW FRONT SOFTWARE PRIVATE LIMITED is deep rooted into the grounds of computation, which is fuelled by strong working environments of advanced computer systems. Only Technology can produce Technology. Our systems include high processing GPUs, and Graphics Drivers, which help us to create the most amazing digital effects, creative designs, logos, and enriched web app graphics When combined with softwares like Adobe Suite and MacOS tools, the results are next to none.</p>
               <button className='w-[20%] rounded-lg h-10 bg-white text-green-600'>Get Now</button>
            </div>
            <div  className='w-[50%] flex justify-center items-end'>
                <img className='w-[50%]  object-cover' src={mobileApp} alt="MobileApp" />
            </div>
        </div>
    </div>
  )
}

export default MobileAppAdd