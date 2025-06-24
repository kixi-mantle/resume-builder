import { UseFormRegister } from "react-hook-form";
import { Template_1_type } from "../../../../ResumeTemplate/resumeSchema";



export type PersonalInfoProps = {
    data : {
        name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    photo: string | null;
    };
    register : UseFormRegister<Template_1_type>

}

const PersonalInfo = ({data , register} : PersonalInfoProps)=>{


    return (
        <div className=" w-full flex flex-col gap-4">

            <div className="sm:flex gap-2">

      <div className="sm:basis-[50%] flex flex-col gap-2">

        
        <label className="text-sm font-semibold text-gray-600">Name</label>
        <input
          {...register("name")}
          defaultValue={data.name}
          placeholder="Your full name"
          className="p-2 border-[1.5px]  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="sm:basis-[50%] flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">Address</label>
        <input
          {...register("address")}
          defaultValue={data.address}
          placeholder="Your address"
          className="p-2 border-[1.5px]  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
            
        </div>

        <div className="sm:flex gap-2">
<div className=" sm:basis-[50%] flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">Phone</label>
        <input
          {...register("phone")}
          defaultValue={data.phone}
          placeholder="Your phone number"
          className="p-2 border-[1.5px]  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <div className="sm:basis-[50%] flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">Email</label>
        <input
          {...register("email")}
          defaultValue={data.email}
          placeholder="Your email"
          className="p-2 border-[1.5px]  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
        </div>

      

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">Website</label>
        <input
          {...register("website")}
          defaultValue={data.website}
          placeholder="Your website or portfolio URL(optional)"
          className="p-2 border-[1.5px]  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">Photo URL</label>
        <input
          {...register("photo")}
          defaultValue={data.photo || ""}
          placeholder="Photo URL (optional)"
          className="p-2 border-[1.5px]  border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
    </div>
    )

}

export default PersonalInfo