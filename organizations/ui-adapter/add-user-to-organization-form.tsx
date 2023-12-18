"use client";

import { Button, Input } from "@nextui-org/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { createOrganization } from "../api-adapter/create-organization";

const EMAIL_REGEX = new RegExp(
  "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/"
);

export default function AddUserToOrganizationForm({ onClose }: any) {
  const processForm: SubmitHandler<OrganizationMember> = async (data) => {
    const { email } = data;
    await createOrganization({
      email,
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
            <Input
              label="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email address",
                },
              })}
            />
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
