import axios from "axios"

export const executeAuthorizedCreateQuery = async (
  url: string,
  token: string,
  data: any
) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
