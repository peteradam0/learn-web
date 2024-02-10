import { RoomServiceClient } from "livekit-server-sdk";

import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
const host = process.env.LIVEKIT_API_URL;

export default async function handleRemove(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const livekitHost = host ? host : "";
    const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);
    const data: any = JSON.parse(req.body);

    try {
      await roomService.removeParticipant(data.roomName, data.identity);
      res.status(200);
    } catch (e) {
      res.statusMessage = (e as Error).message;
      res.status(500).end();
    }
  }
}
