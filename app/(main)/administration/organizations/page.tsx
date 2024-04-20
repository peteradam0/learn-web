"use client"
import {
  Button,
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

import { Icon } from "@iconify/react/dist/iconify.js"

import { getOrganizations } from "@/users/api/organizations/get-organizations"
import OrganizationModal from "@/users/ui/organizations/organization-modal"
import Cookies from "js-cookie"
import { useRouter, useSearchParams } from "next/navigation"
import IntegrationForm from "@/canvaslms/ui/integration-form"

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EDIT", uid: "edit" },
  { name: "ACTIONS", uid: "actions" }
]

export default function OrganizationsPageRoute() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()

  const [organizationsData, setOrganizationsData] = useState([])
  const [modalVersion, setModalVersion] = useState("")
  const [currentOrganization, setCurrentOrganization] = useState(Object)
  const router = useRouter()

  const handleOpenModal = (modalVersion: string, organization: object) => {
    setModalVersion(modalVersion)
    setCurrentOrganization(organization)
    onOpen()
  }

  useEffect(() => {
    getOrganizationData()
    const canvasAuth = searchParams?.get("canvasAuth")
    if (canvasAuth && Cookies.get("canvas_token")) {
      handleOpenModal("auth", organizationsData)
    }
  }, [])

  const getOrganizationData = async () => {
    try {
      setLoading(true)
      const res = await getOrganizations()
      setOrganizationsData(res?.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRedirectToOrganization = (organization: any) => {
    router.push(`/administration/organizations/${organization.name}`)
  }

  const handleDeleteOrganization = async () => {
    const organizations = organizationsData.filter(function (
      organization: any
    ) {
      return organization.name !== currentOrganization.name
    })
    setOrganizationsData(organizations)
  }

  const renderCell = React.useCallback((organization: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: organization.imageUrl }}
            name={organization.name}
          />
        )
      case "edit":
        return (
          <Button
            onClick={() => handleRedirectToOrganization(organization)}
            variant="bordered"
          >
            Edit
          </Button>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Icon
                  icon="iconamoon:trash-fill"
                  onClick={() => handleOpenModal("delete", organization)}
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
    <div className="min-h-screen p-6 bg-blackflex items-center justify-center">
      <div
        className="container max-w-screen-lg mx-auto p-6"
        style={{ background: "#12181f", border: "solid #494949 0.0006em" }}
      >
        <h1 className="font-semibold text-xl text-white">
          Manage Organizations
        </h1>
        <p className="text-gray-400 mb-4">
          ed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <div className="flex gap-3">
                <Button
                  onPress={() => handleOpenModal("create", currentOrganization)}
                  size="md"
                  color="success"
                >
                  Create
                </Button>
                <OrganizationModal
                  onClose={onClose}
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  modalVersion={modalVersion}
                  organization={currentOrganization}
                  handleDeleteOrganization={handleDeleteOrganization}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small pb-2">
                Total {organizationsData?.length} organizations
              </span>
            </div>
          </div>
          <Table aria-label="Organizations table">
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
            <TableBody items={organizationsData}>
              {item => (
                <TableRow>
                  {columnKey => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div style={{ paddingTop: "90px" }}>
            <IntegrationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
