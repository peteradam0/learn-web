import axios from "axios";

export async function POST(req: Request) {
  const { code, clientSecret, clientId, domain } = await req.json();

  try {
    const { data } = await axios.post(
      createApiUrl(code, clientSecret, clientId, domain)
    );
    const { access_token } = data;
    return Response.json(
      {
        ...data,
      },
      {
        headers: {
          "Set-Cookie": `canvas_token=${access_token}`,
        },
      }
    );
  } catch (e) {
    return Response.json({
      message: "Token generation failed " + e,
    });
  }
}

const createApiUrl = (
  code: string,
  client_sercret: string,
  client_id: string,
  domain: string
): string => {
  return `${domain}/login/oauth2/token?code=${code}&client_id=${client_id}&grant_type=authorization_code&client_secret=${client_sercret}&redirect_uri=http//:localhost:3000`;
};
