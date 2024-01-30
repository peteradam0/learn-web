"use client";

import DemoMeetingTab from "@/livekit/ui-adapter/meeting-tab";
import styles from "../../../styles/home.module.css";

const EventsPageRoute = () => {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <DemoMeetingTab label="Demo" />
      </main>
    </>
  );
};

export default EventsPageRoute;
