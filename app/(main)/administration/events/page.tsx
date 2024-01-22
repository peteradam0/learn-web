"use client";

import { getVideoEvents } from "@/event/api-adapter/get-video-events";
import EventCard from "@/event/ui-adapter/event-card";
import { Button, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const res = await getVideoEvents();
      setEventsData(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600 pb-1">Events</h2>
        <p className="text-gray-500 mb-6">
          ed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>

        <div style={{ paddingBottom: "20px" }}>
          <Link href="/administration/events/create">
            <Button>Create event</Button>
          </Link>
        </div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="container mx-auto py-46 px-8">
            <div className="grid lg:grid-cols-3 gap-4">
              {eventsData.map((ev: any) => (
                <>
                  <EventCard key={ev.description} eventData={ev} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
