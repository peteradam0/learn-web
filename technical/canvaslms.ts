import Cookies from "js-cookie"
const CANVAS_TOKEN_KEY = "canvas_token"
const CANVAS_DOMAIN = "canvas_domain"

export const getCanvasToken = () => Cookies.get(CANVAS_TOKEN_KEY)

export const getCanvasDomain = () => localStorage.getItem(CANVAS_DOMAIN);
