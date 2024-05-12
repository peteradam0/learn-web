import { getEvents } from "@/event/api/get-events"
import EventCard from "@/event/ui/event-card"
import { Button, Link } from "@nextui-org/react"

export default async function EventsPage() {
  const eventsData = await getEvents()

  return (
    <div className="min-h-screen p-6 primaryColor flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="py-8">
          <h2 className="font-semibold text-xl text-white pb-1">Events</h2>
          <p className="mb-6">
            Ed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>

          <Link href="/administration/events/create">
            <Button size="sm" color="success">
              Create event
            </Button>
          </Link>
        </div>
        <div className="pt-2">
          <div className="container mx-auto py-46">
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
  )
}
