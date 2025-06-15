import { ReactNode } from "react";

export default function dashboardLayout({children} : { children : ReactNode}){

    return <>
    

    <div className="container">
        {children}
    </div>
    </>
}