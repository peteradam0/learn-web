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
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import OrganizationMemberModal from "@/organizations/ui-adapter/organization-member-modal";
import { getOrganizationMemberData } from "@/organizations/api-adapter/create-organization";
import IntegrationForm from "@/integration/ui-adapter/integration-form";

const statusColorMap = {
  CUSTOMER: "success",
  ADMIN: "danger",
  TEACHER: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" },
];

export default function OrganizationPageRoute({ params }: any) {
  const { organizationName } = params;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [modalVersion, setModalVersion] = useState("");
  const [userId, setUserId] = useState("");

  const handleOpenModal = (modalVersion: string, userId: string) => {
    setModalVersion(modalVersion);
    setUserId(userId);
    onOpen();
  };

  useEffect(() => {
    getOrganizationUserData();
  }, []);

  const getOrganizationUserData = async () => {
    try {
      setLoading(true);
      const res = await getOrganizationMemberData(organizationName);
      setUserData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.imageUrl }}
            description={user.email}
            name={user.username}
          ></User>
        );
      case "role":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.userRole]}
            size="sm"
            variant="flat"
          >
            {user.userRole}
          </Chip>
        );
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
        );
      default:
        return "";
    }
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className=" p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <IntegrationForm />

        <div className="flex flex-col gap-4" style={{ paddingTop: "20px" }}>
          <h2 className="font-semibold text-xl text-gray-600">Manage users</h2>
          <div className="flex justify-between gap-3 items-end">
            <div className="flex gap-3">
              <Button
                onPress={() => handleOpenModal("add", userId)}
                color="primary"
                endContent={<Icon icon="ph:plus-bold" />}
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
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small pb-2">
              Total {userData?.length} users
            </span>
          </div>
        </div>
        <Table aria-label="Example table with custom cells">
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
          <TableBody items={userData}>
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
  );
}
