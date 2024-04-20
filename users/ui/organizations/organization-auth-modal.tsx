import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

export default function OrganizationAuthModal({
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
                Canvas LMS toke added!
              </ModalHeader>
              <ModalBody>
                <p>
                  Now you should get suggestions of people and courses that are
                  already added in your organization on Canvas
                </p>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
