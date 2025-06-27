import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Template_1_type } from "../../../../ResumeTemplate/resumeSchema";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useTransition } from "react";

export type PersonalInfoProps = {
  data: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    photo: string | null;
    occupation : string
  };
  register: UseFormRegister<Template_1_type>;
  setValue: UseFormSetValue<Template_1_type>;
};

const PersonalInfo = ({ data, register, setValue }: PersonalInfoProps) => {

  const [isPending , startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)


  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    startTransition(()=>{

      const file = e.target.files?.[0];
      if (!file) return;
  
      const previewUrl = URL.createObjectURL(file);
      setValue('photo' , previewUrl)
    })

    
  };

  return (
    <div className="w-full flex flex-col gap-4">
  <div className="sm:flex gap-2">
    <div className="sm:basis-[50%] flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Name</label>
      <input
        {...register("name")}
        defaultValue={data.name}
        placeholder="Your full name"
        className="p-2 border-[1.5px] border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <div className="sm:basis-[50%] flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Address</label>
      <input
        {...register("address")}
        defaultValue={data.address}
        placeholder="Your address"
        className="p-2 border-[1.5px] border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  </div>

  <div className="sm:flex gap-2">
    <div className="sm:basis-[50%] flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Phone</label>
      <input
        {...register("phone")}
        defaultValue={data.phone}
        placeholder="Your phone number"
        className="p-2 border-[1.5px] border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
    </div>

    <div className="sm:basis-[50%] flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Email</label>
      <input
        {...register("email")}
        defaultValue={data.email}
        placeholder="Your email"
        className="p-2 border-[1.5px] border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
    </div>
  </div>

  <div className="sm:flex gap-2">
    <div className="sm:basis-[50%] flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Occupation</label>
      <input
        {...register("occupation")}
        defaultValue={data.occupation}
        placeholder="Your profession/role"
        className="p-2 border-[1.5px] border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
    </div>

    <div className="sm:basis-[50%] flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Website</label>
      <input
        {...register("website")}
        defaultValue={data.website}
        placeholder="Your website or portfolio URL (optional)"
        className="p-2 border-[1.5px] border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
    </div>
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-600">Profile Photo</label>
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        ref={inputRef}
        className="hidden"
        id="photo-upload"
      />
      <label htmlFor="photo-upload">
        <Button
          variant="outline"
          type="button"
          className="flex gap-2 items-center"
          onClick={()=>{
            inputRef.current?.click()
          }}
        >
          <Upload className="w-4 h-4" />
          Upload Photo
        </Button>
      </label>

      {isPending && (
        <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-accent rounded-lg">
          <div className="border-4 w-8 h-8 rounded-full border-t-transparent animate-spin border-red-400"></div>
        </div>
      )}

      {data.photo && (
        <Image
          width={120}
          height={140}
          src={data.photo}
          alt="Uploaded"
          className="rounded-md object-cover border"
        />
      )}
    </div>
  </div>
</div>
  );
};

export default PersonalInfo;
