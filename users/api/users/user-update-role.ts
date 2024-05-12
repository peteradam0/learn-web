import { queryToken } from "@/common/api/query/get-user-token"
import axios from "axios"
import qs from "query-string"

export const updateUserRole = async (userId: string, role: any) => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`
  })
  let res = undefined
  try {
    res = await axios.put(
      url,
      { role },
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
