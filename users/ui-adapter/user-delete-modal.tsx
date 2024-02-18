"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";


export default function UserDeleteModal({ isOpen, onOpenChange, userId }: any) {
  const handleDeleteUser = () => {
    console.log("delete " + userId);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete user
              </ModalHeader>
              <ModalBody>
                <p>Are you sure that you want to delete this user?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="success"
                  onClick={() => {
                    handleDeleteUser();
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
