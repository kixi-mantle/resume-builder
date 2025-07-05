"use client"

import React, { useEffect, useState, useTransition } from 'react'

import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoreVertical, FilePlus2 } from 'lucide-react'
import Link from 'next/link'
import { Template_1_type } from '../../ResumeTemplate/resumeSchema'
import { createResume, deleteResume, getResumeFromUser } from '../../action/resumeAction'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

export type DashboardContentProps = {
  resumes : {id : string , 
  title : string , 
  createdAt : string,}[] ,
  user : {
    id : string , 
    name : string ,
    email : string
  }
}
export const DashboardContent = ({user} :{ user : DashboardContentProps['user']})=>{
     const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [ispending , startTransition] = useTransition()
  const [resumes , setResumes] = useState<DashboardContentProps['resumes'] | null>(null)
  const [isdelete , setIsdelete] = useState<string>('')


  useEffect(()=>{
    const fetchResumes = async()=>{
      const res = await getResumeFromUser(user.id)
      setResumes(res)
    }

    fetchResumes()
  } , [user])

  const handleCreate = async()=>{

    if(resumes && resumes.length >= 1){
      toast.error("Error",{
        description : "You cannot create more than 1 resume please delete the current resume"
      })
      return
    }
     const defaultvalues : Template_1_type = {
      
           name: '',
           occupation : '',
        address: '',
        phone: '',
        email: '',
        website: '',
        photo: null,
        summary: '',
        experience: [],
        education: [],
        additionalInfo: '',
      }

        startTransition(async()=>{
          const res = await createResume({ownerId : user.id , resumeData : defaultvalues , title})
          setIsOpen(false)
          
          if(res.data !== null){
            toast.success("Success" , {
              description : res.msg
            })
              const newResume = res.data
             setResumes((prev) => {
              if (prev == null) {
                return [newResume]
              }
              return [...prev , newResume]
             })
          }else {
             toast.error("Error" , {
              description : res.msg
            })
          }
          
        })
    
  }

  const handleDelete = async(id : string)=>{
    setIsdelete(id)
    const res = await deleteResume(id);
    if(res.error){
      toast.error("Error",{
        description : "Something wrong"
      })
      setIsdelete('')
    }else{
       setIsdelete('')
      setResumes(prev => {
        if(!prev) return null
        return prev.filter(val=> val.id != id)})
    }

    
     
  }
    return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Resumes</h1>
            <p className="text-gray-600 mt-1">Manage and edit your professional resumes</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                <FilePlus2 className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-gray-200 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-gray-800">New Resume</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-gray-700">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3 border-gray-300 focus-visible:ring-blue-500"
                    placeholder="My Awesome Resume"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  onClick={() => handleCreate()}
                  disabled={!title.trim() || ispending}
                >
                  {ispending ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mx-4"></div>
                  ) : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Resumes Table */}
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
          <Table>
            {resumes == null ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : resumes.length === 0 ? (
              <TableCaption className="py-12">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <FilePlus2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700">No resumes yet</p>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Get started by creating your first professional resume
                  </p>
                  
                </div>
              </TableCaption>
            ) : (
              <>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-gray-700 font-medium">Name</TableHead>
                    <TableHead className="text-gray-700 font-medium">Created At</TableHead>
                    <TableHead className="text-right text-gray-700 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumes.map((resume) => (
                    <TableRow key={resume.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800">
                        {resume.title}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {format(new Date(resume.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200">
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md border border-gray-200 w-40">
                            
                            <DropdownMenuItem className="p-0 ">
                              <Link 
                                href={`dashboard/resume/${resume.id}/edit`} 
                                className="w-full px-2 py-1.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0 ">
                              <div className="w-full px-2 py-1.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer" onClick={()=>redirect(`/dashboard/resume/${resume.id}/preview`)}>
                                Download
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0 ">
                              <div 
                                className="w-full px-2 py-1.5 text-red-600 hover:bg-gray-100 hover:text-red-700 cursor-pointer"
                                onClick={() => handleDelete(resume.id)}
                              >
                                {isdelete == resume.id ? (
                                  <div className="w-4 h-4 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto"></div>
                                ) : 'Delete'}
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
        </div>
      </div>
    </div>
  )
}