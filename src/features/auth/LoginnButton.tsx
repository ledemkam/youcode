"use client"

import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import {  Loader, LogIn } from "lucide-react"
import { signIn } from "next-auth/react"

const LoginnButton = () => {
    const mutation = useMutation({
        mutationFn: async () => signIn()
    })
  return (
    <Button variant="outline" size="sm" onClick={() => {mutation.mutate()}}>
        {mutation.isPending ? (
            <Loader className="mr-2" size={12} />
          ) : <LogIn className="mr-2" size={12} />
        }
        Login
    </Button>
  )
}
export default LoginnButton