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
