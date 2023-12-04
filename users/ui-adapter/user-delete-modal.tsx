"use client";
import { useClerk } from "@clerk/nextjs";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import React from "react";

export default function UserDeleteModal({ isOpen, onOpenChange }: any) {
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

                <Button color="primary" onClick={() => {}}>
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
