import { getLiveKitURL } from "@/livekit/technical/server-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleServerUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { region } = req.query;

    if (Array.isArray(region)) {
      throw Error("provide max one region string");
    }
    const url = getLiveKitURL(region);
    res.status(200).json({ url });
  } catch (e) {
    res.statusMessage = (e as Error).message;
    res.status(500).end();
  }
}
