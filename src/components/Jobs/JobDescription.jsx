import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT , APPLICATION_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { data } from 'autoprefixer';

function JobDescription() {

    const {singleJob} = useSelector(store => store.job)
    const {user} = useSelector(store => store.auth)

    const isInitialApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitialApplied)

    
    const params = useParams();
    const jobId = params.id;
    console.log("Job ID:", params.id);

    console.log(jobId)

    const dispatch = useDispatch()

    const applyJobHandler = async () => {
      try {
        const res  = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true})

        if(res.data.success){
          setIsApplied(true); // update the local state
          const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
          dispatch(setSingleJob(updateSingleJob)) // helps to real time UI update
          toast.success(res.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
      }
    }

    useEffect(() => {
      const fetchSingleJobs = async () => {
          try {
              const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true})
              console.log(res)
              if(res.data.success){
                  dispatch(setSingleJob(res.data.job))
                  setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in  sync with fetched data
              }
          } catch (error) {
              console.log(error);
              
          }
      }
      fetchSingleJobs();
    },[jobId,dispatch,user?._id])
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost ">{singleJob?.position} Position</Badge>
                <Badge className={'text-orange-700 font-bold'} variant="ghost ">{singleJob?.jobType}</Badge>
                <Badge className={'text-green-700 font-bold'} variant="ghost ">{singleJob?.salary}LPA</Badge>
            </div>
        </div>
        <Button  onClick= {isApplied ? null : applyJobHandler}
        className={`text-white rounded-xl ${isApplied ? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed ' : 'bg-purple-800 hover:bg-purple-900'}`}>
        {
            isApplied ? 'Already Applied ' :  'Apply Now'
        }
        </Button>
      </div>
        <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>Job description</h1>
      <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Requirements: <span className='pl-4 font-normal text-gray-800'>{singleJob.requirements}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>

      </div>
    </div>
  )
}

export default JobDescription