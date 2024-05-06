"use server"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export const queryToken = async () => {
  const token = await auth().getToken()

  if (!token) {
    redirect("/sign-in")
  }

  return token as string
}
