import axios from "axios"

export const executeAuthorizedFetchQuery = async (
  url: string,
  token: string
) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
