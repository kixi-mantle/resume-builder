import Preview from "./PreviewPage";




const Page = async({params} : { params : Promise<{resumeId : string}>}) => {

  const {resumeId} = await params;
  
    return (
      <>
      <Preview resumeId={resumeId}/>
      </>
    )
  
};

export default Page;