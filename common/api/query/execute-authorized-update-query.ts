import axios from "axios"

export const executeAuthorizedUpdateQuery = async (
  url: string,
  token: string,
  data: any
) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
