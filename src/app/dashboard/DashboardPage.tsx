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
import { createResume, getResumeFromUser } from '../../action/resumeAction'
import { toast } from 'sonner'
import { useUpdateStore } from '../../store/data'

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
  const {resumePartialUpdate , setResumePartialUpdate} = useUpdateStore()


  useEffect(()=>{
    const fetchResumes = async()=>{
      const res = await getResumeFromUser(user.id)
      setResumes(res)
    }

    fetchResumes()
  } , [user])

  const handleCreate = async()=>{
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
    return (
    <div className="p-6 bg-red-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-900">Your Resumes</h1>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-700 hover:bg-red-800 text-white">
                <FilePlus2 className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-red-100">
              <DialogHeader>
                <DialogTitle className="text-red-900">New Resume</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-red-800">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3 border-red-200 focus-visible:ring-red-300"
                    placeholder="My Awesome Resume"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  className="border-red-300 text-red-800 hover:bg-red-50"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-red-700 hover:bg-red-800 text-white"
                  onClick={handleCreate}
                  disabled={!title.trim() || ispending }
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg bg-white shadow-sm">
          <Table>
            { resumes == null ? (
              <TableBody>
                <TableRow>
                <TableCell>

              <div className='w-10 h-10 rounded-full border-t-transparent border-4 animate-spin border-red-400 mx-auto my-4'></div>
                </TableCell>
                </TableRow>
                
              </TableBody>

            ) : resumes.length === 0 ? (
              <TableCaption className="py-8">
                <div className="text-center space-y-4">
                  <p className="text-xl font-semibold text-accent">No resumes yet</p>
                  
                </div>
              </TableCaption>
            ) : (
              <>
                <TableHeader className="bg-red-50">
                  <TableRow>
                    <TableHead className="text-red-900">Name</TableHead>
                    <TableHead className="text-red-900">Created At</TableHead>
                    <TableHead className="text-right text-red-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className=''>
                  { resumes.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell className="font-medium">{resume.title}</TableCell>
                      <TableCell>
                        {format(new Date(resume.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:text-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-400 ">
                              <Link href={'/'} className='w-full h-full   hover:text-white'>View</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-400 ">
                               <Link href={`dashboard/resume/${resume.id}/edit`} className='w-full h-full   hover:text-white'>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-400 " asChild>
                              <div className='w-full h-full hover:text-white'>Download</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-400 " asChild>
                             <div className='w-full h-full hover:text-white'>delete</div>
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