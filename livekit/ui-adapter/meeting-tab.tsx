import {
  encodePassphrase,
  generateRoomId,
  randomString,
} from "@/livekit/technical/client";
import { useRouter } from "next/navigation";

import { useState } from "react";

function DemoMeetingTab({ label }: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const startMeeting = () => {
    if (e2ee) {
      router.push(
        `/testlive/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`
      );
    } else {
      router.push(`/testlive/${generateRoomId()}`);
    }
  };
  return (
    <div>
      <p style={{ margin: 0 }}>
        Try LiveKit Meet for free with our live demo project.
      </p>
      <button
        style={{ marginTop: "1rem" }}
        className="lk-button"
        onClick={startMeeting}
      >
        Start Meeting
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoMeetingTab;
