import { CanvasAuth } from "@/common/domain/types";
import Cookies from "js-cookie";

const CANVAS_ID = "canvas_id";
const CANVAS_SECRET = "canvas_secret";
const CANVAS_DOMAIN = "canvas_domain";

export const createRedirectUrl = (domain: string, clientId: string): string => {
  return `${domain}/login/oauth2/auth?client_id=${clientId}&response_type=code&state=001&redirect_uri=http://localhost:3000/administration/organizations/canvas`;
};

export const createLocalStorageCanvasData = (canvasData: CanvasAuth) => {
  const { clientId, domain, clientSecret } = canvasData;

  localStorage.setItem(CANVAS_ID, clientId);
  localStorage.setItem(CANVAS_DOMAIN, domain);
  localStorage.setItem(CANVAS_SECRET, clientSecret);
};

export const getLocalStorageCanvasData = () => {
  return {
    clientId: localStorage.getItem(CANVAS_ID),
    clientSecret: localStorage.getItem(CANVAS_SECRET),
    domain: localStorage.getItem(CANVAS_DOMAIN),
  };
};

export type CanvasAuthToken = {
  clientId: string;
  domain: string;
  clientSecret: string;
};

export const removeCanvasToken = () => {
  Cookies.remove("canvas_token");
};

export const removeCanvasLocalStorageData = () => {
  localStorage.removeItem(CANVAS_ID);
  localStorage.removeItem(CANVAS_DOMAIN);
  localStorage.removeItem(CANVAS_SECRET);
};
