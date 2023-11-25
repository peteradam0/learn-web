"use client";
import { CreateChapterProps, CreateCourseProps } from "@/common/domain/types";
import { getCourse } from "@/course/api-adapter/get-course";
import { getUserToken } from "@/course/domain/get-user-token";
import { UUID } from "uuid-generator-ts";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  DropdownTrigger,
  Input,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { UploadButton } from "@/common/api-adapter/uploadthing";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EditChapters from "@/course/ui-adapter/edit-chapters";

export default function EditCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const [url, setUrl] = useState("");
  const [courseData, setCourseData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState("Frontend");
  const [chapterList, setChapterList] = useState([] as any);

  const handleAddChapterClick = () => {
    const uuid = new UUID();
    const id = uuid.toString();
    setChapterList(
      chapterList.concat(
        <EditChapters
          courseId={params.courseId}
          key={id}
          uuid={id}
          closeChapter={closeChapter}
          displayRemoveBadge="true"
          handleRemoveChapter={handleRemoveChapter}
        />
      )
    );
  };

  const loadChapters = (chapterData: any[]) => {
    const chapterSet = new Set(chapterData);

    const list: any[] = [];

    chapterSet.forEach((chapter) => {
      list.push(
        <EditChapters
          courseId={params.courseId}
          key={chapter.id}
          handleRemoveChapter={handleRemoveChapter}
          chapterData={chapter}
        />
      );
      setChapterList(list);
    });
  };

  const handleRemoveChapter = () => {
    setChapterList(chapterList);
  };

  const closeChapter = (uuid: string) => {
    console.log(uuid);
    console.log(chapterList);
  };

  const processForm: SubmitHandler<CreateCourseProps> = async (data) => {
    //TODO: update course
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const course = await getCourse(token, params.courseId);
      setCourseData(course?.data);

      setUrl(course?.data.imageUrl);
      setCategory(course?.data.category);

      if (course?.data?.chapterData) {
        loadChapters(course?.data?.chapterData);
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCourseProps>({});

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Edit and Publish your course
          </h2>

          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Course details</p>
              <p>Here you can start the creation process of a course.</p>
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
                    defaultValue={courseData.title}
                    {...register("title", {
                      required: "Title is required",
                    })}
                  ></Input>

                  {errors.title?.message && (
                    <p className="text-sm text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                    Please enter the description of the course
                  </h3>
                  <Textarea
                    label="Description"
                    defaultValue={courseData.description}
                    {...register("description", {
                      required: "Description is required",
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
                  <Dropdown backdrop="blur">
                    <DropdownTrigger>
                      <Button
                        color="primary"
                        variant="bordered"
                        {...register("category", {
                          value: category,
                          required: "Category is required",
                        })}
                      >
                        {category}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="faded"
                      aria-label="Static Actions"
                      onAction={(key) => {
                        setCategory(key.toString());
                      }}
                    >
                      <DropdownItem key="Frontend">Frontend</DropdownItem>
                      <DropdownItem key="Backend">Backend</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
                          onClientUploadComplete={(res) => {
                            setUrl(res?.[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />

                        <input
                          className="hidden"
                          value={url}
                          {...register("imageUrl", {
                            required: "Image is required",
                          })}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <Button type="submit">Update</Button>
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
  );
}
