import { clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
  if (request.body === null) return

  const { userId } = await request.json()

  try {
    await clerkClient.users.deleteUser(userId)
    return NextResponse.json({ message: "Success" })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Error deleting user" })
  }
}
