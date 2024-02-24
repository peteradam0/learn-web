import { CreateChapterProps } from "@/common/domain/types"

import { SubmitHandler, useForm } from "react-hook-form"

import { UploadButton } from "@/common/api/uploadthing"
import { getVideLengthInMin } from "@/common/domain/course-domain"
import {
  Badge,
  Button,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea
} from "@nextui-org/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { createChapter } from "../api/create-chapter"
import { removeChapter } from "../api/remove-chapter"
import { updateChapter } from "../api/update-chapter"
import { getUserToken } from "../domain/get-user-token"

export default function EditChapters({
  courseId,
  handleRemoveChapter,
  chapterData
}: any) {
  const [url, setUrl] = useState(chapterData?.videoUrl)
  const [chapterId, setChapterId] = useState(chapterData?.id)
  const [duration, setDuration] = useState("00:00")

  const processForm: SubmitHandler<any> = async (data: any) => {
    if (chapterId) {
      //update chapter
      const chapter: any = await updateChapter(
        {
          id: chapterId,
          title: data.title,
          description: data.description,
          videoUrl: url,
          courseId: courseId,
          videoDuration: duration
        },
        chapterId,
        courseId
      )
    } else {
      //create chapter
      const chapter: any = await createChapter(
        {
          title: data.title,
          description: data.description,
          videoUrl: url,
          videoDuration: duration
        },
        courseId
      )
      setChapterId(chapter?.data.id)
    }
  }

  const removeFromList = async () => {
    if (chapterId) {
      const token = await getUserToken()
      if (!token) {
        redirect("/")
      }
      await removeChapter(courseId, chapterId, token)
      handleRemoveChapter()
    } else {
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateChapterProps>({})

  return (
    <>
      <Divider className="bg-gray-600 my-4" />
      <div className="p-1">
        <h2 className="font-semibold text-xl text-white p-1">
          Edit your chapters
        </h2>

        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-400">
            <p className="p-1">
              By prssing the delete button the chapter will be removed
            </p>
            <div className="pt-2">
              <Button color="danger" size="sm" onClick={() => removeFromList()}>
                Delete Chapter
              </Button>
            </div>
          </div>

          <form className="lg:col-span-2" onSubmit={handleSubmit(processForm)}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="p-1 md:col-span-5">
                <h3 className="text-default-500 text-small pb-1">
                  The first thing that you will have to specify is the title of
                  the chapter
                </h3>
                <Input
                  className="pt-1"
                  variant="bordered"
                  label="Title"
                  defaultValue={chapterData?.title}
                  {...register("title", {
                    required: "Title is required"
                  })}
                ></Input>

                {errors.title?.message && (
                  <p className="text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>
              <div className="p-1 md:col-span-5">
                <h3 className="text-default-500 text-small pb-1">
                  Please enter the description of the course
                </h3>
                <Textarea
                  className="pt-1"
                  variant="bordered"
                  defaultValue={chapterData?.description}
                  label="Description"
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

              <div className="p-1 md:col-span-5 ">
                <h3 className="text-default-500 text-small pb-1">
                  Please upload the video for this chapter
                </h3>
                {url === "" && errors.videoUrl?.message && (
                  <p className="text-sm text-red-400">
                    {errors.videoUrl.message}
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
                        <video
                          id={chapterId}
                          src={url}
                          className="object-cover border-1 h-48 w-96"
                          onLoadedDataCapture={() => {
                            setDuration(getVideLengthInMin(chapterId))
                          }}
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
                        content={{
                          allowedContent() {
                            return ""
                          }
                        }}
                        endpoint="videoUploader"
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
                        {...register("videoUrl", {
                          required: "The video for this is required"
                        })}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="md:col-span-5 text-right p-1">
                <div className="inline-flex items-end">
                  <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                      <Button type="submit" color="success">
                        {chapterData ? "Update" : "Create"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-tiny">
                          {chapterData
                            ? "Successful update"
                            : "Successful create"}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
