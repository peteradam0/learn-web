"use client";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React from "react";
import CreateOrganizationForm from "./create-organization-form";

export default function CreateOrganizationModal({ isOpen, onOpenChange }: any) {
  const router = useRouter();
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create organization
              </ModalHeader>
              <ModalBody>
                <p>
                  Createing organizations allow the users to publish private
                  courses that will only be availble for a specified number of
                  users.
                </p>
                <CreateOrganizationForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
