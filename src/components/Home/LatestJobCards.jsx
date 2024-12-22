import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({job}) {
  const navigate = useNavigate()
  return (
    <div onClick={() =>  navigate(`/description/${job._id}`)} className='p-5  border border-gray-100 shadow-md rounded-lg cursor-pointer'> 
        <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
        </div>  
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-700'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost ">{job?.position} Position</Badge>
            <Badge className={'text-orange-700 font-bold'} variant="ghost ">{job?.jobType}</Badge>
            <Badge className={'text-green-700 font-bold'} variant="ghost ">{job?.salary}LPA</Badge>

        </div>
        
      
    </div>
  )
}

export default LatestJobCards