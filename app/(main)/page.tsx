import { getCoursesDomain } from "@/course/api/get-courses-domain"
import { getInProgressCourseDomain } from "@/course/api/get-in-progress-courses"
import { queryToken } from "@/course/api/query/get-user-token"
import { getUserDomainData } from "@/dashboard/api/get-user-domain-data"
import { AllCoursesCard } from "@/dashboard/ui/all-courses-card"
import { CoursesInProgressCard } from "@/dashboard/ui/courses-in-progress-card"
import { getActiveEventsDomain } from "@/event/api/get-active-events"
import { getFutureEvents } from "@/event/api/get-future-events"
import { ActiveEventsCard } from "@/event/ui/active-events-card"
import { UpcomingEvents } from "@/event/ui/upcoming-events-card"
import { Footer } from "@/navigation/ui/footer"
import MainHeader from "@/navigation/ui/main-navigation"
import { Divider } from "@nextui-org/react"

export default async function DashboardPageRoute() {
  const token = await queryToken()
  if (!token) return
  const user = await getUserDomainData()
  const inProgressCourses = await getInProgressCourseDomain(token)
  const courses = await getCoursesDomain(token)
  const events = await getActiveEventsDomain(token)
  const futureEvents = await getFutureEvents(token)

  return (
    <>
      <MainHeader />
      <div
        style={{
          marginLeft: "17%",
          marginRight: "17%",
          paddingTop: "2%",
          paddingBottom: "4rem"
        }}
        className="primaryBackGround"
      >
        <h1 className="text-xl pb-7">Welcome Back, {user.username} </h1>
        <Divider />
        <div className="pt-5">
          <div className="grid grid-cols-2" style={{ gap: "70px" }}>
            <div>
              <h1>Courses in progress</h1>
              <div className="pt-5">
                <CoursesInProgressCard inProgressCourses={inProgressCourses} />
              </div>
            </div>
            <div>
              <h1>Explore courses</h1>
              <div className="pt-5">
                <AllCoursesCard courses={courses} />
              </div>
            </div>
            <div>
              <h1>Active events</h1>
              <div className="pt-5">
                <ActiveEventsCard events={events} />
              </div>
            </div>
            <div>
              <h1>Upcoming events</h1>
              <div className="pt-5">
                <UpcomingEvents futureEvents={futureEvents} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
