import { notFound } from "next/navigation";
import { getResume } from "../../../../../action/resumeAction";
import Preview from "./PreviewPage";




const Page = async({params} : { params : Promise<{resumeId : string}>}) => {

  const {resumeId} = await params;
  
  const data = await getResume(resumeId)
  if(!data) return notFound()
    return (
      <>
      <Preview resumeId={resumeId} data={data}/>
      </>
    )
  
};

export default Page;