import { getCourseDomain } from "@/course/api/get-courses-domain"
import { getInProgressCourseDomain } from "@/course/api/get-in-progress-courses"
import { queryToken } from "@/course/api/query/get-user-token"
import { getUserDomainData } from "@/dashboard/api/get-user-domain-data"
import { DashboardPage } from "@/dashboard/ui/dashboard-page"
import { getActiveEventsDomain } from "@/event/api/get-active-events"
import { getFutureEvents } from "@/event/api/get-future-events"

export default async function DashboardPageRoute() {
  const token = await queryToken()
  if (!token) return
  const user = await getUserDomainData()
  const inProgressCourses = await getInProgressCourseDomain(token)
  const courses = await getCourseDomain(token)
  const events = await getActiveEventsDomain(token)
  const futureEvents = await getFutureEvents(token)

  return (
    <>
      <DashboardPage
        user={user}
        inProgressCourses={inProgressCourses}
        courses={courses}
        events={events}
        futureEvents={futureEvents}
      />
    </>
  )
}
