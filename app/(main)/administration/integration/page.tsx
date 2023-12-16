'use client'

import { CanvasAuth } from "@/common/domain/types";
import { getUserToken } from "@/course/domain/get-user-token";
import { Button,  Input, } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";


export default function IntegrationPageRoute () {
    const processForm: SubmitHandler<CanvasAuth> = async (data) => {
        const token = await getUserToken();
        
        if (!token) {
          redirect("/");
        }
        
        const {clientId} = data
        const {domain} = data

        console.log(data)
      };

      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<CanvasAuth>({
        defaultValues: {
        clientId: "",
        domain: ""
        }
      });
      
    return(
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <h2 className="font-semibold text-xl text-gray-600">
          Integrate with Canvas LMS
        </h2>
        <p className="text-gray-500 mb-6">
          By Integrating with Canvas LMS, private courses will be automatically with the necessary users created.
        </p>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Api details</p>
              <p>In order to access the desired Canvas LMS, a developer key is needed that can be created under <span>Admin - Delveloper Keys</span></p>
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
                    {...register("clientId", { required: "Client id is required" })}
                  />
                  {errors.clientId?.message && (
                    <p className="text-sm text-red-400">
                      {errors.clientId.message}
                    </p>
                  )}
                </div>       
                <div className="p-1 md:col-span-5">
                  <h3 className="text-default-500 text-small pb-1">
                  An example for the domain is 'http://canvas.docker'
                  </h3>
                  <Input
                    label="Domain"
                    {...register("domain", { required: "Domain is required" })}
                  />
                  {errors.domain?.message && (
                    <p className="text-sm text-red-400">
                      {errors.domain.message}
                    </p>
                  )}
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
  </div>)
}
