"use client"

import { UploadButton } from "@/common/api/uploadthing"
import { queryToken } from "@/common/api/query/get-user-token"
import { queryCourseData } from "@/course/api/query/query-course-data"
import { updateChapter } from "@/course/api/update-publication"
import EditChapters from "@/course/ui/edit-chapters"
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Switch,
  Textarea,
  cn
} from "@nextui-org/react"

import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { UUID } from "uuid-generator-ts"
import { updateCourse } from "@/course/api/query/update-course"

type EditCourseFormData = {
  title: string
  description: string
  imageUrl: string
  category: string
  videoUrl: string
  organization: string
}
export default function EditCoursePage({
  params
}: {
  params: { courseId: string }
}) {
  const decodedId = atob(params.courseId)
  const [url, setUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [courseData, setCourseData] = useState<any>()
  const [isLoading, setLoading] = useState(true)
  const [category, setCategory] = useState("Frontend")
  const [chapterList, setChapterList] = useState([] as any)
  const [publish, setIsPublished] = useState(false)
  const router = useRouter()

  const handleAddChapterClick = () => {
    const uuid = new UUID()
    const id = uuid.toString()
    setChapterList(
      chapterList.concat(
        <EditChapters
          courseId={decodedId}
          key={id}
          uuid={id}
          displayRemoveBadge="true"
          handleRemoveChapter={handleRemoveChapter}
        />
      )
    )
  }

  const loadChapters = (chapterData: any[]) => {
    const chapterSet = new Set(chapterData)

    const list: any[] = []

    chapterSet.forEach(chapter => {
      list.push(
        <EditChapters
          courseId={decodedId}
          key={chapter.id}
          handleRemoveChapter={handleRemoveChapter}
          chapterData={chapter}
        />
      )
      setChapterList(list)
    })
  }

  const handleRemoveChapter = () => {
    setChapterList(chapterList)
  }

  const handlePublication = async () => {
    await updateChapter(decodedId)
    setIsPublished(!publish)
  }

  const processForm: SubmitHandler<EditCourseFormData> = async data => {
    const token = await queryToken()

    if (!token) {
      redirect("/")
    }
    try {
      await updateCourse(
        {
          title: data.title,
          description: data.description,
          category: data.category,
          imageUrl: url,
          videoUrl: videoUrl,
          organization: data.organization
        },
        token
      )
      reset()
      router.push(`/administration/courses/`)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCourseData()
  }, [])

  const getCourseData = async () => {
    const token = await queryToken()

    if (!token) {
      redirect("/")
    }

    try {
      const course = await queryCourseData(token, decodedId)
      setCourseData(course?.data)

      setUrl(course?.data.imageUrl)
      setVideoUrl(course?.data.videoUrl)
      setCategory(course?.data.category)

      if (course?.data?.chapterData) {
        loadChapters(course?.data?.chapterData)
      }
      setIsPublished(course?.data?.published)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditCourseFormData>({})

  if (isLoading) return <p>Loading...</p>
  return (
    <div className="min-h-screen p-4  flex items-center justify-center">
      <div
        className="container max-w-screen-lg mx-auto p-4"
        style={{ background: "#12181f", border: "solid #2e2e2e 0.0006em" }}
      >
        <div>
          <h2 className="font-semibold text-xl text-white">
            Edit and Publish your course
          </h2>

          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-400 pt-1">
              <p>Here you can start the creation process of a course.</p>
              <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Switch
                  isSelected={publish}
                  onClick={() => handlePublication()}
                  classNames={{
                    base: cn(
                      "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                      "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                    wrapper: "p-0 h-4 overflow-visible",
                    thumb: cn(
                      "w-6 h-6 border-2 shadow-lg",
                      "group-data-[hover=true]:border-primary",
                      //selected
                      "group-data-[selected=true]:ml-6",
                      // pressed
                      "group-data-[pressed=true]:w-7",
                      "group-data-[selected]:group-data-[pressed]:ml-4"
                    )
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-medium">Publication</p>
                    <p className="text-tiny text-default-400">
                      By turning the switch on the course will be published
                    </p>
                  </div>
                </Switch>
              </div>
            </div>
            <form
              className="lg:col-span-2"
              onSubmit={handleSubmit(processForm)}
            >
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                    The first thing that you will have to specify is the name of
                    the course
                  </h3>
                  <Input
                    label="Title"
                    className="pt-1"
                    variant="bordered"
                    defaultValue={courseData?.title}
                    {...register("title", {
                      required: "Title is required"
                    })}
                  ></Input>

                  {errors.title?.message && (
                    <p className="text-sm text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="p-1 md:col-span-5 pt-1">
                  <h3 className="text-default-500 text-small pb-1">
                    Please enter the description of the course
                  </h3>
                  <Textarea
                    className="pt-1"
                    label="Description"
                    variant="bordered"
                    defaultValue={courseData?.description}
                    {...register("description", {
                      required: "Description is required"
                    })}
                  />
                  {errors.description?.message && (
                    <p className="text-sm text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                    Please select the course category
                  </h3>
                  <div className="pt-1">
                    <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          color="success"
                          variant="bordered"
                          {...register("category", {
                            value: category,
                            required: "Category is required"
                          })}
                        >
                          {category}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="faded"
                        aria-label="Static Actions"
                        onAction={key => {
                          setCategory(key.toString())
                        }}
                      >
                        <DropdownItem key="Frontend">Frontend</DropdownItem>
                        <DropdownItem key="Backend">Backend</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  {errors.category?.message && (
                    <p className="text-sm text-red-400">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="p-1 md:col-span-5 ">
                  <h3 className="text-default-500 text-small pb-1">
                    Please upload the thumbnail image of the course
                  </h3>
                  {url === "" && errors.imageUrl?.message && (
                    <p className="text-sm text-red-400">
                      {errors.imageUrl.message}
                    </p>
                  )}
                  {url && (
                    <div className="p-3 ">
                      <div className="relative flex">
                        <Badge
                          content="X"
                          size="lg"
                          color="default"
                          onClick={() => setUrl("")}
                        >
                          <Image
                            src={url}
                            alt="upload"
                            className="object-cover border-1 h-48 w-96 "
                          />
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    {!url && (
                      <>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={res => {
                            setUrl(res?.[0].url)
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`)
                          }}
                        />

                        <input
                          className="hidden"
                          value={url}
                          {...register("imageUrl", {
                            required: "Image is required"
                          })}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="p-1 md:col-span-5 ">
                  <h3 className="text-default-500 text-small pb-1">
                    Please upload the preview video of the course
                  </h3>
                  {videoUrl === "" && errors.videoUrl?.message && (
                    <p className="text-sm text-red-400">
                      {errors.videoUrl.message}
                    </p>
                  )}
                  {videoUrl && (
                    <div className="p-3 ">
                      <div className="relative flex">
                        <Badge
                          content="X"
                          size="lg"
                          color="default"
                          onClick={() => setVideoUrl("")}
                        >
                          <video
                            src={videoUrl}
                            className="object-cover border-1 h-48 w-96 "
                          />
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    {!videoUrl && (
                      <>
                        <UploadButton
                          endpoint="videoUploader"
                          onClientUploadComplete={res => {
                            setVideoUrl(res?.[0].url)
                          }}
                          content={{
                            allowedContent() {
                              return ""
                            }
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`)
                          }}
                        />

                        <input
                          className="hidden"
                          value={videoUrl}
                          {...register("videoUrl", {
                            required: "Preview video is required"
                          })}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <Button type="submit" color="success">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>{chapterList}</div>

        <Divider className="bg-gray-600 my-4" />
        <div className="md:col-span-5 text-right">
          <div className="inline-flex items-end">
            <Button type="submit" onClick={() => handleAddChapterClick()}>
              Add new chapeters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
