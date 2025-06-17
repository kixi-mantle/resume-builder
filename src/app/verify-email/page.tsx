


import Link from "next/link";
import { verifyEmail } from "../../action/auth";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams
}: {
  searchParams: {
    token: string;
    id: string;
  };
}) {
  const { token, id } = await searchParams;
  console.log(token)

  // Handle missing parameters
  if (!token || !id) {
  console.log("there is no token or id ");
  
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

  // Verify email
  const res = await verifyEmail({ token, id });

  // Successful verification - redirect
  if (!res.error) {
    redirect('/dashboard');
  }

  // Render appropriate UI based on state
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {res.error ? (
        // Verification failed state
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Verification Failed</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{res.error || "Email verification failed"}</p>
          <div className="flex flex-col space-y-3">
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              Try registering again
            </Link>
           
          </div>
        </div>
      ) : (
        // Verification in progress state
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Verifying Your Email</h1>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we verify your email address...</p>
        </div>
      )}
    </div>
  );
}