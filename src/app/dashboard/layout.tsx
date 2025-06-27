import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function dashboardLayout({children} : { children : ReactNode}){

    return <>
    

    <div >
        <Navbar/>
        <div className="mt-[4rem] bg-red-50">

        {children}
        </div>
    </div>
    </>
}