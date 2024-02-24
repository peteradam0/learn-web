import dynamic from "next/dynamic";

export const PreJoinNoSSR = dynamic(
  async () => {
    return (await import("@livekit/components-react")).PreJoin;
  },
  { ssr: false }
);
