"use server"
import { auth } from "@clerk/nextjs"

export const queryToken = () => {
  const token = auth().getToken()

  if (!token) {
    return null
  }

  return token
}
