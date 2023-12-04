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
import { useRouter } from "next/navigation";

import React from "react";

export default function UserEditModal({
  isOpen,
  onOpenChange,
  modalVersion,
}: any) {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {modalVersion}
              <ModalHeader className="flex flex-col gap-1">
                Edit user
              </ModalHeader>
              <ModalBody>
                <p>Edit user data.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="primary"
                  onClick={() => signOut(() => router.push("/sign-up"))}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
