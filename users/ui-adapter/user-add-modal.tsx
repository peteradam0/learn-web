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


export default function UsersAddModal({
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
              <ModalHeader className="flex flex-col gap-1">
                User registration
              </ModalHeader>
              <ModalBody>
                <p>
                  Since the application is using clerk for user registration,
                  the user has to be first registered on CLERK side.
                </p>
                <p>
                  Therefore by pressing the continue button, you will get
                  redirected to the CLERK sign up.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="success"
                  onClick={() => signOut(() => router.push("/sign-up"))}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
