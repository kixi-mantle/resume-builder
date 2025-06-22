import { getUserFromSession } from '../../action/auth'
import { redirect } from 'next/navigation'
import { getResumeFromUser } from '../../action/resumeAction'
import { DashboardContent } from './DashboardPage'



const DashboardPage =  async() => {
  const resumes = await getResume()

  return (
    <>
    <DashboardContent resumes={resumes} />
    </>
  )



 

  
}

async function getResume() {
  const res = await getUserFromSession()
  if (res.error) redirect("/signup")

  const resumes = await getResumeFromUser(res.data!.id)
  
  
  return resumes
}

export default DashboardPage