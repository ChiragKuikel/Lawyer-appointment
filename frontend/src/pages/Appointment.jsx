import React from 'react'
import { lawyers } from '../assets/assets';
import { useParams } from 'react-router-dom';
import { availableTimes } from '../assets/assets';
import { useState } from 'react';
const Appointment = () => {
  const [lawyerIndex,setLawyerIndex] = useState({
  day: null,
  timeIndex: null
});
  let {id} = useParams();
  const appointment={
  lawyer_id:id,
  day:null,
  time:null
}

const setAppointment = () =>{
  const nonNullDay = Object.entries(lawyerIndex).find(([day, value]) => value !== null) //object.entries converts object into array of arrays
  const [dayName, value] = nonNullDay;
  appointment.day = dayName;
  appointment.time = value;
  console.log(appointment);
}
  const currentLawyer = availableTimes.find((lawyer) => lawyer.id === parseInt(id));
  console.log(currentLawyer);
  return (
    <div>
    <div className='flex'>
      <div className='bg-gray-50 p-4'>
        <div className='flex flex-row'>
          <div>
            <img src={lawyers[id-1].image} className='h-52'/>
          </div>
          <div className='content-center'>
            <h1 className='text-xl font-bold pl-2'>Name:{lawyers[id-1].name}</h1>
            <h1 className='text-l p-2' >Experience:{lawyers[id-1].experience}</h1>
            <h1 className='text-l p-2'>Speciality:{lawyers[id-1].speciality}</h1>
            <button className='bg-red-100 border-primary border-2 text-primary p-1 font-medium '>View profile</button>
          </div>
        </div>
      </div>
      
      <div className='flex border w-2/3 justify-around'>
        <div className='flex flex-col justify-around'>
        <div className='text-primary'>Date</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        </div>
        <div className='flex flex-col justify-around'>
        <div className='text-primary'>Available Time</div>
        <div>{currentLawyer.availability.monday.available}</div>
        <div>{currentLawyer.availability.tuesday.available}</div>
        <div>{currentLawyer.availability.wednesday.available}</div>
        <div>{currentLawyer.availability.thursday.available}</div>
        <div>{currentLawyer.availability.friday.available}</div>
        </div>
        <div className='flex flex-col justify-around'>
        <div className='text-primary'>Preferred time</div>
        <div className='flex flex-row justify-around gap-2 '>{
          currentLawyer.availability.monday.preferred.map((time,index)=>(
            <div key={index} className={lawyerIndex.day === 'monday ' && lawyerIndex.timeIndex == index ?'py-1 px-2 bg-red-400  cursor-pointer ':'py-1 px-2 bg-red-100  cursor-pointer '} onClick={()=>setLawyerIndex({day :'monday', timeindex: lawyerIndex.monday === index ? null : index})}>{time}</div>
          )) 
        }
        </div>
        <div className='flex flex-row justify-around gap-2' >
          {
          currentLawyer.availability.tuesday.preferred.map((time,index)=>(
            <div key={index} className={lawyerIndex.day === 'tuesday ' && lawyerIndex.timeIndex == index ?'py-1 px-2 bg-red-400  cursor-pointer ':'py-1 px-2 bg-red-100  cursor-pointer '} onClick={()=>setLawyerIndex({day :'monday', timeindex: lawyerIndex.monday === index ? null : index})}>{time}</div>
          ))
        }
        </div>
        <div className='flex flex-row justify-around gap-2' >
         {
          currentLawyer.availability.wednesday.preferred.map((time,index)=>(
            <div key={index} className={lawyerIndex.day === 'wednesday' && lawyerIndex.timeIndex == index ?'py-1 px-2 bg-red-400  cursor-pointer ':'py-1 px-2 bg-red-100  cursor-pointer '} onClick={()=>setLawyerIndex({day :'monday', timeindex: lawyerIndex.monday === index ? null : index})}>{time}</div>
          ))
        }
        </div>
        <div className='flex flex-row justify-around gap-2'>
          {
          currentLawyer.availability.thursday.preferred.map((time,index)=>(
            <div key={index} className={lawyerIndex.day === 'thursday' && lawyerIndex.timeIndex == index ?'py-1 px-2 bg-red-400  cursor-pointer ':'py-1 px-2 bg-red-100  cursor-pointer '} onClick={()=>setLawyerIndex({day :'monday', timeindex: lawyerIndex.monday === index ? null : index})}>{time}</div>
          ))
        }
        </div>
        <div className='flex flex-row justify-around gap-2'>
          {
          currentLawyer.availability.friday.preferred.map((time,index)=>(
            <div key={index} className={lawyerIndex.day === 'friday' && lawyerIndex.timeIndex == index ?'py-1 px-2 bg-red-400  cursor-pointer ':'py-1 px-2 bg-red-100 cursor-pointer '} onClick={()=>setLawyerIndex({day :'monday', timeindex: lawyerIndex.monday === index ? null : index})}>{time}</div>
          ))
        }
        </div>
        </div>
      </div>
    </div>
    <div className="w-full flex justify-end mt-4">
  <button className="bg-green-600 text-white px-6 py-2 rounded" onClick={setAppointment}>
    Book Appointments
  </button>
</div>
    </div>
  )
}

export default Appointment;