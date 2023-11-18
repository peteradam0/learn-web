"use client";

import React, { useState } from "react";
import { getUserToken } from "@/course/domain/get-user-token";
import { redirect } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import { createCourse } from "@/course/api-adapter/create-course";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UploadButton } from "@/common/api-adapter/uploadthing";
import { CreateCourseProps } from "@/common/domain/types";

export default function AddCoursePageRoute() {
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Frontend");
  const router = useRouter();

  const processForm: SubmitHandler<CreateCourseProps> = async (data) => {
    //TODO: this is hacky, find a better approach

    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const res = await createCourse(
        {
          title: data.title,
          description: data.description,
          category: data.category,
          imageUrl: url,
        },
        token
      );
      console.log(res);
      reset();
      router.push(`/administration/courses/`);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCourseProps>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      category: category,
    },
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Create a new course
          </h2>
          <p className="text-gray-500 mb-6">
            Fill out the form with the data of the new course
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
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
                      The first thing that you will have to specify is the name
                      of the course
                    </h3>
                    <Input
                      label="Title"
                      {...register("title", { required: "Title is required" })}
                    />
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
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
