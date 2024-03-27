"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Badge } from "@/components/ui/badge";

export type Task = {
  task_id: string
  task_name: string
  description: string
  priority: "HIGHEST" |"HIGH"| "MEDIUM" |"LOW"
  status: "IN_PROGRESS" | "OPEN" | "CLOSED" 
  start_date : Date
  end_date: Date
}

export const columns: ColumnDef<Task>[] = [
    
    {
      accessorKey: "task_name",
      header: "Task Name"
    },
    {
      accessorKey: "description",
      header: "Description"
    },
    {
      accessorKey: "priority",
      header: "Priority"
      
    },
    {
        accessorKey: "status",
        header: "Status"
        
      },
      {
        accessorKey: "start_date",
        header: "Start Date"
        
      },
      {
        accessorKey: "end_date",
        header: "End Date"
        
      },
    {
      id: "actions",
      cell: ({ row }) => {
        const { task_id } = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/tasks/${task_id}`}>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]