import axios from "axios"

export const executeAuthorizedDeleteQuery = async (
  url: string,
  token: string
) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
