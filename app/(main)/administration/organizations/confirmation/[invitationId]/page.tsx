"use client"

import { confirmInvite } from "@/users/api/organizations/create-organization"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function OrganizationConfirmationPageRoute({ params }: any) {
  const { invitationId } = params
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getOrganizationUserData()
  }, [])

  const getOrganizationUserData = async () => {
    try {
      setLoading(true)
      await confirmInvite(invitationId)
      setLoading(false)
      router.push("/courses")
    } catch (e) {
      console.log(e)
    }
  }
  if (loading) return <p>Loading...</p>
  return <div>{invitationId}</div>
}
