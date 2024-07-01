// pages/about.js

import MainNavigation from "@/common/ui/main-navigation"
import { Card, Button, Avatar } from "@nextui-org/react"

const About = () => {
  return (
    <div className="pt-2">
      <MainNavigation />
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "black" }}
      >
        <Card
          className="max-w-3xl p-8 bg-gray-800 text-white shadow-lg rounded-lg"
          style={{ background: "#12181f" }}
        >
          <div className="flex items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1">About This Project</h2>
              <p className="text-sm text-gray-400">
                Master’s Thesis by Peter Adam
              </p>
            </div>
          </div>
          <p className="text-lg mb-4">
            Welcome to the web-based educational platform developed as part of
            my Master’s Thesis at the Faculty of Mathematics and Informatics,
            Babeș-Bolyai University of Cluj-Napoca, specializing in Enterprise
            Software Design and Development.
          </p>
          <p className="text-lg mb-4">
            This application facilitates and makes digital, online learning
            widely accessible. During the design and development of the
            application, I incorporated all aspects of my specialization,
            combining them with my professional experience. My goal was to
            create an application based on modern, future-proof technologies
            that meets the requirements of contemporary web applications.
          </p>
          <p className="text-lg mb-4">
            Future-proofing was considered not only in the selection of
            technologies but also in the design of the application architecture.
          </p>
          <h3 className="text-lg font-semibold mb-2">Technologies Used:</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li className="text-lg">
              Next.js - A powerful React framework for building server-side
              rendered and statically generated web applications.
            </li>
            <li className="text-lg">
              Spring Boot - A Java based freamwork, that is ideal for server application development.
            </li>
          </ul>
          <p className="text-lg mb-4">
            Thank you for visiting and exploring this educational platform. We
            hope it meets your learning needs and provides a seamless online
            education experience.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default About
