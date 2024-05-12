import Cookies from "js-cookie"
const CANVAS_TOKEN_KEY = "canvas_token"

export const getCanvasToken = () => Cookies.get(CANVAS_TOKEN_KEY)
