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

import { getOrganizationMemberData } from "@/users/api/organizations/create-organization"
import { columns } from "@/users/domain/organization"
import OrganizationMemberModal from "@/users/ui/organizations/organization-member-modal"
import { Icon } from "@iconify/react/dist/iconify.js"
import { roleColorsMap } from "@/users/domain/users"

export default function OrganizationPageRoute({ params }: any) {
  const { organizationName } = params
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
    getOrganizationUserData()
  }, [])

  const getOrganizationUserData = async () => {
    try {
      setLoading(true)
      const res = await getOrganizationMemberData(organizationName)
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
    <>
      <div
        className="min-h-screen p-6 flex items-center justify-center"
        style={{ height: "100%" }}
      >
        <div
          className="container max-w-screen-lg mx-auto p-6"
          style={{ border: "solid #494949 0.0006em" }}
        >
          <h2 className="font-semibold text-xl text-white">Manage users</h2>
          <p className="text-gray-400 mb-4">
            ed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
          <div className="flex flex-col gap-4" style={{ paddingTop: "20px" }}>
            <div className="flex justify-between gap-3 items-end">
              <div className="flex gap-3">
                <Button
                  onPress={() => handleOpenModal("add", userId)}
                  color="success"
                >
                  Add New
                </Button>
                <OrganizationMemberModal
                  isOpen={isOpen}
                  userId={userId}
                  onOpenChange={onOpenChange}
                  modalVersion={modalVersion}
                  organizationName={organizationName}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-default-400 text-small pb-2 pt-1">
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
    </>
  )
}
