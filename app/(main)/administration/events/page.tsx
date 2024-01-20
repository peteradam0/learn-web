"use client";

import React, { useEffect, useState } from "react";

import { SubmitHandler } from "react-hook-form";
import {
  Badge,
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";

import { useForm } from "react-hook-form";

import { getOrganizations } from "@/organizations/api-adapter/get-organizations";

import { EventFormProps } from "@/event/domain/event";
import UserListBox from "@/event/ui-adapter/user-listbox";
import { UploadButton } from "@/common/api-adapter/uploadthing";
import { getUsers } from "@/users/api-adapter/getUsers";
import { getOrganizationMemberData } from "@/organizations/api-adapter/create-organization";

export default function EventsPageRoute() {
  const [url, setUrl] = useState();
  const [organization, setOrganization] = useState("Public");
  const [organizationData, setOrganizationData] = useState([]);
  const [limitUsers, setLimitUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrganizationData();
  }, []);

  const getOrganizationData = async () => {
    setLoading(true);
    const res = await getOrganizations();

    setOrganizationData(res?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (limitUsers && organization) {
      if (organization === "Public") {
        // getAllusers
        getAllUserData();
      } else {
        // get users for given organization
        getUserDataForOrganization();
      }
    }
  }, [organization, limitUsers]);

  const getAllUserData = async () => {
    const res = await getUsers();
    setUsers(res?.data);
  };

  const getUserDataForOrganization = async () => {
    const res = await getOrganizationMemberData(organization);
    setUsers(res?.data);
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EventFormProps>({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      organization: "",
    },
  });

  const processForm: SubmitHandler<EventFormProps> = async (data) => {
    if (limitUsers && selectedUsers.size == 0) {
      console.log("users are limeted but no users are selected");
      setError("users", {
        type: "required",
        message: "Users are limeted but no users are selected",
      });
    }
    console.log(selectedUsers);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Create a new event
          </h2>
          <p className="text-gray-500 mb-6">
            Fill out the form with the data of the new event
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Event details</p>
                <p>
                  An event can be public or private based on the event details.
                </p>
                <p>
                  Events can be limited to a certain organization, or to a
                  certail set of users. In case the event is public, every user
                  will be able to join the event.
                </p>
              </div>
              <form
                className="lg:col-span-2"
                onSubmit={handleSubmit(processForm)}
              >
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="p-1 md:col-span-5">
                    <h3 className="text-default-500 text-small pb-1">
                      The first thing that you will have to specify is the name
                      of the event
                    </h3>

                    <Input
                      label="Name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />

                    {errors.name?.message && (
                      <p className="text-sm text-red-400">
                        {errors.name.message}
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
                      Should the course be published only for a certain
                      organization or it should be public
                    </h3>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Select
                        label="Organization"
                        className="max-w-xs"
                        // @ts-ignore
                        onChange={(key) => {
                          setOrganization(key.target.value);
                        }}
                        {...register("organization", {
                          value: organization,
                          required: "Organization is required",
                        })}
                      >
                        {organizationData.map((org: any) => (
                          <SelectItem key={org.name} value={org.name}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {errors.organization?.message && (
                      <p className="text-sm text-red-400">
                        {errors.organization.message}
                      </p>
                    )}
                  </div>
                  <div className="p-1 md:col-span-5">
                    <h3 className="text-default-500 text-small pb-1">
                      The event can be limited only for certain users
                    </h3>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Switch onChange={() => setLimitUsers(!limitUsers)}>
                        <h3 className="text-default-500 text-small pb-1">
                          Limit users
                        </h3>
                      </Switch>
                    </div>
                    <div className="p-1 md:col-span-5 pt-3">
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        {limitUsers && (
                          <UserListBox
                            users={users}
                            setSelectedUsers={setSelectedUsers}
                          />
                        )}
                      </div>
                      {limitUsers && selectedUsers.size === 0 && (
                        <p className="text-sm text-red-400">
                          {errors.users && <p>{errors.users.message}</p>}
                        </p>
                      )}
                    </div>
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
                      <Button type="submit">Create</Button>
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
