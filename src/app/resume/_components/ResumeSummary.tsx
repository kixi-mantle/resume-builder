import { UseFormRegister } from "react-hook-form"
import { Template_1_type } from "../../../ResumeTemplate/resumeSchema"


export type SummaryProps = {
      data : {
        summary : string
    } ,
      register : UseFormRegister<Template_1_type>
}

const Summary = ({register , data} : SummaryProps)=>{

    return(
        <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-600">Summary</label>
        <textarea
          {...register("summary")}
          defaultValue={data.summary}
          placeholder="Your address"
          className="p-2 border-[1.5px]  h-[10rem]  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
        />
      </div>
            
    )
}

export default Summary;