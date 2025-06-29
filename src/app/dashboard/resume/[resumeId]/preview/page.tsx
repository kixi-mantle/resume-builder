
import PreviewPage from "./PreviewPage";



const Page = async({params} : { params : Promise<{resumeId : string}>}) => {

  const {resumeId} = await params;
  
    return (
      <>
      <PreviewPage resumeId={resumeId}/>
      </>
    )
  
};

export default Page;