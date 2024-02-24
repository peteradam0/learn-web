"use client"
import { UploadButton } from "@/common/api/uploadthing"

import { Badge, Button, Input, Image } from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { createOrganization } from "../api/create-organization"
import { Organization } from "@/organizations/domain/organization"

export default function CreateOrganizationForm({ onClose }: any) {
  const [url, setUrl] = useState("")

  const processForm: SubmitHandler<Organization> = async data => {
    const { name } = data
    await createOrganization({
      name,
      imageUrl: url
    })
    onClose()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Organization>({
    defaultValues: {
      name: "",
      imageUrl: ""
    }
  })
  return (
    <>
      <form className="lg:col-span-2" onSubmit={handleSubmit(processForm)}>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
          <div className="p-1 md:col-span-5">
            <h3 className="text-default-500 text-small pb-1">
              Please provide the name of the organization
            </h3>
            <Input
              label="name"
              {...register("name", { required: "Client id is required" })}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="p-1 md:col-span-5 ">
            <h3 className="text-default-500 text-small pb-1">
              Please upload the image of the organization
            </h3>
            {url === "" && errors.imageUrl?.message && (
              <p className="text-sm text-red-400">{errors.imageUrl.message}</p>
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
          <div className="md:col-span-5 text-right">
            <div className="inline-flex items-end">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
