"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import React from "react";
import { deleteOrganization } from "../api-adapter/delete-organizations";

export default function OrganizationDeleteModal({
  isOpen,
  onOpenChange,
  organization,
  handleDeleteOrganization,
}: any) {
  const handleDeleteUser = async () => {
    console.log(organization);
    await deleteOrganization({ name: organization.name });
    handleDeleteOrganization(organization);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Organization
              </ModalHeader>
              <ModalBody>
                <p>Are you sure that you want to delete this organization?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="primary"
                  onClick={() => {
                    handleDeleteUser();
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
