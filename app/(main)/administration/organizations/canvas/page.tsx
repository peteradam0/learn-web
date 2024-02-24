"use client"

import { getLocalStorageCanvasData } from "@/canvaslms/domain/canvas"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function OrganizationPageRoute() {
  const searchParams = useSearchParams()

  const code = searchParams?.get("code")
  const router = useRouter()

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    const { clientId, clientSecret, domain } = getLocalStorageCanvasData()
    await axios.post("/api/canvas", {
      code,
      clientId,
      domain,
      clientSecret
    })

    if (clientId && clientSecret && domain) {
      router.push("/administration/organizations?canvasAuth=true")
    } else {
      router.push("/administration/organizations")
    }
  }

  return <div> Loading ...</div>
}
