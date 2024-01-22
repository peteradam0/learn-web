import { getActiveVideoEvents } from "@/event/api-adapter/get-video-events";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function ActiveCourseCard() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const res = await getActiveVideoEvents();
      setEventData(res?.data);
      setLoading(false);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <ScrollShadow
      hideScrollBar
      offset={100}
      orientation="horizontal"
      className="max-w-[400px] max-h-[300px]"
    >
      {eventData.map((activeEvent) => (
        <>
          <Card key={activeEvent.imageUrl} className="max-w-none ">
            <CardBody>
              <div className="text-sm text-gray-600 flex items-center">
                <div className="text-gray-900 font-bold mb-1 ml-1 p-1">
                  <div className="flex items-center gap-4 pt-1">
                    <img
                      src={activeEvent.imageUrl}
                      style={{ height: "50px", width: "100px" }}
                    />
                    <div className="font-medium text-gray-500">
                      <div className="text-sm">{activeEvent.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {activeEvent.description}
                      </div>
                      <div>
                        Organized by: {activeEvent.organizer.firstName}{" "}
                        {activeEvent.organizer.lastName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex flex-wrap gap-4 items-center pl-3">
                <Link
                  className="text-small"
                  isExternal
                  href={`room/${activeEvent.roomId}`}
                >
                  <Icon icon={"mdi:video-outline"} width={25} /> Join
                </Link>
              </div>
            </CardFooter>
          </Card>
          <div style={{ paddingTop: "20px" }}></div>
        </>
      ))}
    </ScrollShadow>
  );
}
