"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { sendOrganizationMemberInvite } from "../api-adapter/create-organization";
import { OrganizationMember } from "../domain/organization";
import { useEffect, useState } from "react";
import { getOrganizationMemberSuggestions } from "../api-adapter/get-suggested-users";
import Cookies from "js-cookie";

export default function AddUserToOrganizationForm({
  onClose,
  organizationName,
}: any) {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const canvasToken = Cookies.get("canvas_token");
    if (canvasToken) {
      getData(canvasToken);
    }
  });

  const getData = async (canvasToken: string) => {
    try {
      const res = await getOrganizationMemberSuggestions(
        organizationName,
        canvasToken
      );
      console.log(res?.data);
      if (res?.data) setSuggestedUsers(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const processForm: SubmitHandler<OrganizationMember> = async (data) => {
    const { email } = data;
    await sendOrganizationMemberInvite({
      email,
      organizationName,
    });
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrganizationMember>({
    defaultValues: {
      email: "",
    },
  });
  return (
    <>
      <form className="lg:col-span-2" onSubmit={handleSubmit(processForm)}>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
          <div className="p-1 md:col-span-5">
            <h3 className="text-default-500 text-small pb-1">
              Please provide the email address of the new member
            </h3>
            {suggestedUsers.length > 0 ? (
              <Autocomplete
                allowsCustomValue
                className="max-w-xs"
                defaultItems={suggestedUsers}
                label="Search or type in email"
                variant="bordered"
                {...register("email", {
                  required: "Email is required",
                })}
              >
                {(item: any) => (
                  <AutocompleteItem key={item?.email}>
                    {item?.email}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            ) : (
              <Input
                label="Email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            )}

            {errors.email?.message && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="md:col-span-5 text-right">
            <div className="inline-flex items-end">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button type="submit" color="primary">
                Send
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
