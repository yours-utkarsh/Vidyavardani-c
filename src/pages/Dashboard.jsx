import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'

const Dashboard = () => {
    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading} = useSelector((state) => state.profile)
    
    if(authLoading || profileLoading)
    {
        return (
            <Spinner/>
        )
    }

  return (
    <div>

        <Sidebar/>
      
    </div>
  )
}

export default Dashboard
