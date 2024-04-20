"use client"
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  useDisclosure
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"

import { getUsers } from "@/users/api/users/getUsers"
import UsersModal from "@/users/ui/users/users-modal"
import { Icon } from "@iconify/react/dist/iconify.js"
import { UserRole } from "@/common/domain/user"

const roleColorsMap: any = {
  [UserRole.ADMIN]: "danger",
  [UserRole.CONSUMER]: "success"
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" }
]

export default function UserPageRoute() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState([])
  const [modalVersion, setModalVersion] = useState("")
  const [userId, setUserId] = useState("")

  const handleOpenModal = (modalVersion: string, userId: string) => {
    setModalVersion(modalVersion)
    setUserId(userId)
    onOpen()
  }
  useEffect(() => {
    getCourseData()
  }, [])

  const getCourseData = async () => {
    try {
      setLoading(true)
      const res = await getUsers()
      setUserData(res?.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.imageUrl }}
            description={user.email}
            name={user.username}
          ></User>
        )
      case "role":
        return (
          <Chip
            className="capitalize"
            color={roleColorsMap[user.userRole]}
            size="sm"
            variant="flat"
          >
            {user.userRole}
          </Chip>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon
                  width={13}
                  icon="uiw:edit"
                  onClick={() => handleOpenModal("edit", user.id)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Icon
                  icon="iconamoon:trash-fill"
                  onClick={() => handleOpenModal("delete", user.id)}
                />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return ""
    }
  }, [])
  if (loading) return <p>Loading...</p>
  return (
    <div className="min-h-screen p-6  flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto p-3">
        <div>
          <h2
            className="font-semibold text-xl text-white"
            style={{ paddingBottom: "1rem" }}
          >
            Manage Users
          </h2>
          <p className="text-gray-500 mb-6 pt-1">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <div className="flex gap-3">
                <Button
                  onPress={() => handleOpenModal("add", userId)}
                  color="success"
                >
                  Add New
                </Button>
                <UsersModal
                  isOpen={isOpen}
                  userId={userId}
                  onOpenChange={onOpenChange}
                  modalVersion={modalVersion}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small pb-2">
                Total {userData?.length} users
              </span>
            </div>
          </div>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {column => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={userData}>
              {item => (
                <TableRow>
                  {columnKey => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
