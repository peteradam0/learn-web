import { queryToken } from "@/common/api/query/get-user-token"
import axios from "axios"
import { redirect } from "next/navigation"
import qs from "query-string"

export const updateUserRole = async (userId: string, role: any) => {
  const token = await queryToken()
  if (!token) {
    redirect("/")
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update`
  })
  let res = undefined
  try {
    res = await axios.post(
      url,
      { userId, role },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
  return res
}
