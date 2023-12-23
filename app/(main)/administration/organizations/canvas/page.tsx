"use client";
import { getUserToken } from "@/course/domain/get-user-token";
import { CanvasAuthToken } from "@/integration/domain/canvas";
import { Button, Input, Link } from "@nextui-org/react";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function OrganizationPageRoute({ params }: any) {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const processForm: SubmitHandler<CanvasAuthToken> = async (res) => {
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    const { clientId } = res;
    const { domain } = res;
    const { clientSecret } = res;

    await axios.post("/api/canvas", {
      code,
      clientId,
      domain,
      clientSecret,
    });

    cookies().set("name", "lee");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CanvasAuthToken>({
    defaultValues: {
      clientId: "",
      domain: "",
      clientSecret: "",
    },
  });

  return (
    <div>
      <div>
        <div style={{ paddingBottom: "10px" }}>
          <h2 className="font-semibold text-xl text-gray-600">
            Integrate with Canvas LMS
          </h2>
          <p className="text-gray-500 mb-6">
            By Integrating with Canvas LMS, Learn-web will suggest the courses
            that are not yet created and the users that are not yet added to the
            organization
          </p>
        </div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Api details</p>
              <p>
                In order to access the desired Canvas LMS, a developer key is
                needed that can be created under in the Developer Keys section.
              </p>
              <p className="pt-2">
                More about the{" "}
                <Link
                  className="font-medium"
                  size="sm"
                  href="https://canvas.instructure.com/doc/api/"
                >
                  Canvas LMS API
                </Link>
              </p>
            </div>
            <form
              className="lg:col-span-2"
              onSubmit={handleSubmit(processForm)}
            >
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                    An example for a client id is '10000000000002'
                  </h3>
                  <Input
                    label="ClientId"
                    {...register("clientId", {
                      required: "Client id is required",
                    })}
                  />
                  {errors.clientId?.message && (
                    <p className="text-sm text-red-400">
                      {errors.clientId.message}
                    </p>
                  )}
                </div>
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                    An example for a client secret is{" "}
                    '12jhk3k1j2hhjk123kj1hk1jh23'
                  </h3>
                  <Input
                    label="Client Secret"
                    {...register("clientSecret", {
                      required: "Client secret is required",
                    })}
                  />
                  {errors.clientSecret?.message && (
                    <p className="text-sm text-red-400">
                      {errors.clientSecret.message}
                    </p>
                  )}
                </div>
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                    An example for the domain is 'http://canvas.docker'
                  </h3>
                  <Input
                    label="Domain"
                    {...register("domain", {
                      required: "Domain is required",
                    })}
                  />
                  {errors.domain?.message && (
                    <p className="text-sm text-red-400">
                      {errors.domain.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <Button type="submit">Connect</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
function cookies() {
  throw new Error("Function not implemented.");
}
