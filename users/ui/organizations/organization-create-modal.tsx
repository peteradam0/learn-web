import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import CreateOrganizationForm from "./create-organization-form";

export default function OrganizationCreateModal({
  isOpen,
  onOpenChange,
  onClose,
}: any) {
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
