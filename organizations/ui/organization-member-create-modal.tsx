"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import AddUserToOrganizationForm from "./add-user-to-organization-form";

export default function OrganizationMemberCreateModal({
  isOpen,
  onOpenChange,
  onClose,
  organizationName,
}: any) {
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add user to organization
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
                <AddUserToOrganizationForm
                  onClose={onClose}
                  organizationName={organizationName}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
