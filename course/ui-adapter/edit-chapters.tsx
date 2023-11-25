import { CreateChapterProps } from "@/common/domain/types";

import { SubmitHandler, useForm } from "react-hook-form";

import { Badge, Button, Divider, Input, Textarea } from "@nextui-org/react";
import { UploadButton } from "@/common/api-adapter/uploadthing";
import { useState } from "react";

export default function EditChapters({
  courseId,
  displayRemoveBadge,
  uuid,
  handleRemoveChapter,
}: any) {
  const [url, setUrl] = useState("");
  const [disable, setDisable] = useState(false);
  const [chapterId, setChapterId] = useState("");

  const processForm: SubmitHandler<CreateChapterProps> = async (data) => {
    if (disable) {
      setDisable(false);
      setUrl("");
      //  removeChapter(uuid);
    } else {
      //  const chapter = createChapter(courseId, data, url);
      //  setChapterId(chapter.id);
      setDisable(true);
    }
  };

  const removeFromList = () => {
    handleRemoveChapter(uuid);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateChapterProps>({});
  return (
    <>
      <Divider className="bg-gray-600 my-4" />

      <div
        className="p-1"
        style={{ backgroundColor: `${disable ? "#e9e7e7" : ""}` }}
      >
        {displayRemoveBadge && (
          <div className="p-3 ">
            <div className="relative flex bg-red-300">
              <Badge
                content="X"
                size="lg"
                color="default"
                onClick={() => removeFromList()}
              ></Badge>
            </div>
          </div>
        )}
        <h2 className="font-semibold text-xl text-gray-600 p-1">
          Add a new chapter
        </h2>

        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="p-1">Here the chapters of the courses can be added</p>
          </div>
          <form className="lg:col-span-2" onSubmit={handleSubmit(processForm)}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="p-1 md:col-span-5">
                <h3 className="text-default-500 text-small pb-1">
                  The first thing that you will have to specify is the title of
                  the chapter
                </h3>
                <Input
                  disabled={disable}
                  label="Title"
                  {...register("title", {
                    required: "Title is required",
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
                  disabled={disable}
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
                      {!disable && (
                        <Badge
                          content="X"
                          size="lg"
                          color="default"
                          onClick={() => setUrl("")}
                        >
                          <video
                            src={url}
                            className="object-cover border-1 h-48 w-96 "
                          />
                        </Badge>
                      )}
                      {disable && (
                        <video
                          src={url}
                          className="object-cover border-1 h-48 w-96 "
                        />
                      )}
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
                            return "";
                          },
                        }}
                        endpoint="videoUploader"
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
                        {...register("videoUrl", {
                          required: "The video for this is required",
                        })}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="md:col-span-5 text-right p-1">
                <div className="inline-flex items-end">
                  {!displayRemoveBadge && disable && (
                    <Button color="danger" type="submit">
                      Reset
                    </Button>
                  )}
                  {!disable && (
                    <Button disabled={disable} type="submit">
                      Create chapter
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
