export const createRedirectUrl = (domain: string, clientId: string): string => {
  return `${domain}/login/oauth2/auth?client_id=${clientId}&response_type=code&state=001&redirect_uri=http://localhost:3000/administration/organizations/canvas`;
};

export type CanvasAuthToken = {
  clientId: string;
  domain: string;
  clientSecret: string;
};
