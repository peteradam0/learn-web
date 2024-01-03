"use client";

import { CanvasAuth } from "@/common/domain/types";
import { getUserToken } from "@/course/domain/get-user-token";
import { Button, Input, Link } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createLocalStorageCanvasData,
  createRedirectUrl,
  removeCanvasLocalStorageData,
  removeCanvasToken,
} from "../domain/canvas";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function IntegrationForm() {
  const router = useRouter();
  const [token, setToken] = useState(false);
  const processForm: SubmitHandler<CanvasAuth> = async (canvasData) => {
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }
    const { domain, clientId } = canvasData;

    createLocalStorageCanvasData(canvasData);
    router.push(createRedirectUrl(domain, clientId));
  };

  useEffect(() => {
    const t = Cookies.get("canvas_token");
    if (t) return setToken(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CanvasAuth>({
    defaultValues: {
      clientId: "",
      domain: "",
      clientSecret: "",
    },
  });

  return (
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
              The authentication process with the Canvas LMS is a{" "}
              <Link
                className="font-medium"
                size="sm"
                href="https://canvas.instructure.com/doc/api/file.oauth_endpoints.html"
              >
                two step process.
              </Link>
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
          <form className="lg:col-span-2" onSubmit={handleSubmit(processForm)}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <h2 className="font-semibold text-xl text-gray-600">
                Authenticate
              </h2>

              <div className="p-1 md:col-span-5">
                {!token && (
                  <p className="font-semibold text-gray-600 pb-2">
                    Got stuck, no worries check out the{" "}
                    <Link
                      className="font-medium"
                      size="sm"
                      href="https://community.canvaslms.com/t5/Admin-Guide/How-do-I-add-a-developer-API-key-for-an-account/ta-p/259"
                    >
                      documentation
                    </Link>{" "}
                    on developer keys
                  </p>
                )}
                {token && (
                  <p className="font-semibold text-gray-600 pb-2">
                    You are already logged in on Canvas side, to remove your
                    token you can use the remove button from bellow.
                  </p>
                )}

                <h3 className="text-default-500 text-small pb-1">
                  An example for a client id is '10000000000002'
                </h3>
                <Input
                  label="ClientId"
                  {...register("clientId", {
                    required: "Client id is required",
                  })}
                  isDisabled={token}
                />
                {errors.clientId?.message && (
                  <p className="text-sm text-red-400">
                    {errors.clientId.message}
                  </p>
                )}
              </div>
              <div className="p-1 md:col-span-5">
                <h3 className="text-default-500 text-small pb-1">
                  The client secret should contain 64 characters
                </h3>
                <Input
                  label="Client Secret"
                  {...register("clientSecret", {
                    required: "Client secret is required",
                  })}
                  isDisabled={token}
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
                  isDisabled={token}
                />
                {errors.domain?.message && (
                  <p className="text-sm text-red-400">
                    {errors.domain.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  {!token ? (
                    <Button type="submit">Fetch</Button>
                  ) : (
                    <Button
                      onClick={() => {
                        removeCanvasToken();
                        removeCanvasLocalStorageData();
                        setToken(false);
                      }}
                      color="danger"
                    >
                      Remove token
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
