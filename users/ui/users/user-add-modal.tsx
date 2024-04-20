"use client"

import { Button, Input } from "@nextui-org/react"

import { SubmitHandler, useForm } from "react-hook-form"
import { OrganizationMember } from "../../domain/organization"

import { sendUserInvitation } from "@/users/api/users/user-invite"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"

export default function AddUserModal({ onClose, isOpen, onOpenChange }: any) {


  const processForm: SubmitHandler<OrganizationMember> = async data => {
    const { email } = data
    await sendUserInvitation({
      email
    })
    onClose()
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OrganizationMember>({
    defaultValues: {
      email: ""
    }
  })
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add user
              </ModalHeader>
              <ModalBody>
                <p>
                  By submiting this form with a valid email address, an
                  invitation will be sent out.
                </p>
                <p>
                  In case you authenticate with your Canvas LMS account under
                  the integration section, the canvas users will be
                  automatically suggested.
                </p>

                <form
                  className="lg:col-span-2"
                  onSubmit={handleSubmit(processForm)}
                >
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="p-1 md:col-span-5">
                      <h3 className="text-default-500 text-small pb-1">
                        Please provide the email address of the new member
                      </h3>
                      <Input
                        label="Email"
                        {...register("email", {
                          required: "Email is required"
                        })}
                      />
                      {errors.email?.message && (
                        <p className="text-sm text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button type="submit" color="primary">
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
