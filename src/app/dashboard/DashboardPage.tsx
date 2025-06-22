import React, { useState } from 'react'

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

export type ResumeInfo = {
  _id : string , 
  title : string , 
  createdAt : string,
}
export const DashboardContent = ({resumes} : { resumes : ResumeInfo[] })=>{
     const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const createResume = ()=>{

    
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
                  onClick={createResume}
                  disabled={!title.trim()}
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg bg-white shadow-sm">
          <Table>
            {resumes.length === 0 ? (
              <TableCaption className="py-8">
                <div className="text-center space-y-4">
                  <p className="text-gray-600">No resumes yet</p>
                  <Link href="/resumes/create">
                    <Button className="bg-red-700 hover:bg-red-800 text-white">
                      Create your first resume
                    </Button>
                  </Link>
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
                <TableBody>
                  {resumes.map((resume) => (
                    <TableRow key={resume._id}>
                      <TableCell className="font-medium">{resume.title}</TableCell>
                      <TableCell>
                        {format(new Date(resume.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-50">
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-50">
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-red-50">
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50">
                              Delete
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