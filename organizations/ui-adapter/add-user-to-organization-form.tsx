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
      setSuggestedUsers(res?.data);
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
              Please provide the eamil address of the new member
            </h3>
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

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
