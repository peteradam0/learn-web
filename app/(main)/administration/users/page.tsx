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
import { getUsers } from "@/users/api-adapter/getUsers";
import UsersModal from "@/users/ui-adapter/users-modal";

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

export default function UserPageRoute() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [modalVersion, setModalVersion] = useState("");

  const handleOpenModal = (modalVersion: string) => {
    setModalVersion(modalVersion);
    onOpen();
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUserData(res?.data);
      console.log(res?.data);
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
                  Add New
                </Button>
                <UsersModal
                  isOpen={isOpen}
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
    </div>
  );
}
