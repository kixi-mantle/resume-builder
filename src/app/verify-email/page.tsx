import {  XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{token?: string , id?: string}>
}) {
  const { token, id } =  await searchParams;

  // Handle missing parameters
  if (!token || !id) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-rose-100 p-8">
          <div className="space-y-4 text-center">
            <XCircle className="mx-auto h-16 w-16 text-rose-600" />
            <h1 className="text-2xl font-bold text-rose-800">Invalid Verification Link</h1>
            <p className="text-gray-600">The verification link is missing required parameters.</p>
            <Link
              href="/signup"
              className="inline-block px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium"
            >
              Try registering again
            </Link>
          </div>
        </div>
      </div>
    );
  }


   
     
    const res = await fetch(`http://localhost:3000/api/verify-email?token=${token}&id=${id}`, {
      method: "GET",
       headers: {
    'Content-Type': 'application/json',
  },
    });

    
    const data = await res.json();

    

    if (data.success) {
     
      redirect('/dashboard');
    } else{
      return (
         <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-rose-100 p-8">
            <div className="space-y-4 text-center">
              <XCircle className="mx-auto h-16 w-16 text-rose-600" />
              <h1 className="text-2xl font-bold text-rose-800">Verification Failed</h1>
              <p className="text-gray-600">
                {data.message || "We couldn't verify your email address."}
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium"
              >
                Try Again
              </Link>
            </div>
          </div>
        </div>
      )
    }
  // Loading state (will only show very briefly before redirect)
  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-rose-100 p-8">
        <div className="space-y-6 text-center">
          <Loader2 className="mx-auto h-12 w-12 text-rose-600 animate-spin" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-rose-800">Verifying Email</h1>
            <p className="text-gray-600">This will just take a moment...</p>
          </div>
        </div>
      </div>
    </div>
  );
}