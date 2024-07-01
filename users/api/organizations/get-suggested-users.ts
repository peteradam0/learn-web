import { queryToken } from "@/common/api/query/get-user-token"
import { getCanvasDomain } from "@/technical/canvaslms"
import axios from "axios"
import { redirect } from "next/navigation"
import qs from "query-string"

export const getOrganizationMemberSuggestions = async (
  organizationName: string,
  canvasToken: string
) => {
  const token = await queryToken()
  if (!token) {
    redirect("/")
  }
  const canvasDomain = getCanvasDomain()
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${organizationName}/members/create/suggestions`
  })
  let res = undefined
  try {
    res = await axios.post(
      url,
      { canvasDomain },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          csrf_token: `Bearer ${canvasToken}`
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
  return res
}
