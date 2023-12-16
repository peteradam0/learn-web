"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Input,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import CreateOrganizationModal from "@/organizations/ui-adapter/create-organization";
import { getOrganizations } from "@/organizations/api-adapter/get-organizations";
import { getUsers } from "@/users/api-adapter/getUsers";

const statusColorMap = {
  CUSTOMER: "success",
  ADMIN: "danger",
  TEACHER: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "MEMBERS", uid: "members" },
  { name: "ACTIONS", uid: "actions" },
];

export default function OrganizationsPageRoute() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [organizationData, setOrganizationData] = useState([]);
  const [modalVersion, setModalVersion] = useState("");
  const [userId, setUserId] = useState("");

  const handleOpenModal = (modalVersion: string) => {
    setModalVersion(modalVersion);
    onOpen();
  };

  useEffect(() => {
    getOrganizationData();
  }, []);

  const getOrganizationData = async () => {
    try {
      setLoading(true);
      const res = await getOrganizations();
      console.log(res?.data);
      setOrganizationData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const renderCell = React.useCallback((organization: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: organization.imageUrl }}
            name={organization.name}
          ></User>
        );
      case "members":
        return (
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            Members
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon
                  width={13}
                  icon="uiw:edit"
                  onClick={() => handleOpenModal("edit")}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Icon
                  icon="iconamoon:trash-fill"
                  onClick={() => handleOpenModal("delete")}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return "";
    }
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={"search"}
              />
              <div className="flex gap-3">
                <Button
                  onPress={() => handleOpenModal("add")}
                  color="primary"
                  endContent={<Icon icon="ph:plus-bold" />}
                >
                  Create
                </Button>
                <CreateOrganizationModal
                  isOpen={isOpen}
                  userId={userId}
                  onOpenChange={onOpenChange}
                  modalVersion={modalVersion}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small pb-2">
                Total {organizationData?.length} organizations
              </span>
            </div>
          </div>
          <Table aria-label="Organizations table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={organizationData}>
              {(item) => (
                <TableRow>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
