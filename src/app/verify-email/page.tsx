import Link from "next/link";


export default async function verifyEmailPage({searchParams} : { searchParams : {
token : string , id : string
}}){

    const{token , id } = searchParams

    if(!token || !id)  {
        return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Verification Link</h1>
        <p className="mb-4">The verification link is missing required parameters.</p>
        <Link href="/signup" className="text-blue-600 hover:underline">
          Try registering again
        </Link>
      </div>
    );
    }



}