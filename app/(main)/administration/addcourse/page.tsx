"use client";

import React, { useEffect, useState } from "react";
import { getUserToken } from "@/course/domain/get-user-token";
import { redirect } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { Button, Image, Input, Textarea, input } from "@nextui-org/react";
import { createCourse } from "@/course/api-adapter/create-course";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UploadButton } from "@/common/api-adapter/uploadthing";
import { Icon } from "@iconify/react/dist/iconify.js";

type Inputs = {
  title: string;
  description: string;
  imageUrl: string;
};

export default function AddCoursePageRoute() {
  const [data, setData] = useState<Inputs>();
  const [url, setUrl] = useState("");
  const router = useRouter();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    //TODO: this is hacky, find a better approach
    setData({
      ...data,
      imageUrl: url,
    });

    console.log(url);
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const res = await createCourse(data.title, token);
      console.log(res);
      reset();
      router.push(`/administration/addcourse/${res?.data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

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
                    {errors.title?.message && (
                      <p className="text-sm text-red-400">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="p-1 md:col-span-5 ">
                    <h3 className="text-default-500 text-small pb-1">
                      Please upload the thumbnail image of the course
                    </h3>
                    {errors.imageUrl?.message && (
                      <p className="text-sm text-red-400">
                        {errors.imageUrl.message}
                      </p>
                    )}
                    {url && (
                      <div className="p-3 ">
                        <div className="relative flex">
                          <Image
                            src={url}
                            alt="upload"
                            className="object-cover border-1 h-48 w-96 "
                          />
                          <Button
                            onClick={() => setUrl("")}
                            className="bg-rose-500 text-white p-1 rounded-full pl-1 -top-2 -right-1 shadow-sm"
                            type="button"
                          >
                            <Icon icon="ph:x" width="20" height="20" />
                          </Button>
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
