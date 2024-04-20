"use client"
import { updateUserRole } from "@/users/api/users/user-update-role"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from "@nextui-org/react"

import { useState } from "react"

export default function UserEditModal({
  isOpen,
  onOpenChange,
  modalVersion,
  userId
}: any) {
  const [role, setRole] = useState()

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              {modalVersion}
              <ModalHeader className="flex flex-col gap-1">
                Modify user role
              </ModalHeader>
              <ModalBody>
                <p>
                  Edit user data.Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.
                </p>
                <Select
                  label="User role"
                  placeholder="Select a role"
                  className="max-w-xs"
                >
                  <SelectItem value="ADMIN" key={"1"}>
                    ADMIN
                  </SelectItem>
                  <SelectItem value="CONSUMER" key={"2"}>
                    CONSUMER
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="success"
                  onClick={() => updateUserRole(userId, role)}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
