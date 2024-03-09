import { Divider } from "@nextui-org/react"

import { Course } from "@/common/domain/course"
import { User } from "@/common/domain/user"
import { CoursesInProgressCard } from "@/dashboard/ui/courses-in-progress-card"
import { VideoEvent } from "@/event/domain/event"

import { ActiveEventsCard } from "@/event/ui/active-events-card"
import { Footer } from "@/navigation/ui/footer"
import MainHeader from "@/navigation/ui/main-navigation"
import { AllCoursesCard } from "@/dashboard/ui/all-courses-card"
import { UpcomingEvents } from "@/event/ui/upcoming-events-card"

export type DashboardPageProps = {
  user: User
  inProgressCourses: Course[] | undefined
  courses: Course[] | undefined
  events: VideoEvent[]
  futureEvents: VideoEvent[]
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  inProgressCourses,
  courses,
  events,
  futureEvents
}) => {
  return (
    <div>
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
    </div>
  )
}
