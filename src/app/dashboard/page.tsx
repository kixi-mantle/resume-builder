import { getUserFromSession } from '../../action/auth'
import { redirect } from 'next/navigation'
import { DashboardContent } from './DashboardPage'




const DashboardPage =  async() => {
  const {error , data} = await getUserFromSession()
  if(error || !data) redirect('/')
    
  return (
    <>
    <DashboardContent  user = {data}/>
    </>
  )



 

  
}




export default DashboardPage