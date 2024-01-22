import { ListboxWrapper } from "@/event/ui-adapter/user-list-wrapper";
import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useEffect } from "react";

export default function UserListBox({ users, setSelectedUsers }: any) {
  //@ts-ignore
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const currentUserEmail = useUser().user?.emailAddresses[0].emailAddress;
  //@ts-ignore
  const arrayValues = Array.from(values);

  useEffect(() => {
    setSelectedUsers(values);
  }, [values]);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          // @ts-ignore
          <Chip key={value}>{value}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <Listbox
        topContent={topContent}
        disabl
        classNames={{
          base: "max-w-xs",
          list: "max-h-[300px] overflow-scroll",
        }}
        items={users.filter((user: any) => user.email !== currentUserEmail)}
        label="Assigned to"
        selectionMode="multiple"
        //@ts-ignore
        onSelectionChange={setValues}
        variant="flat"
      >
        {(item: any) => (
          <ListboxItem key={item.email} textValue={item.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={item.name}
                className="flex-shrink-0"
                size="sm"
                src={item.avatar}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.email}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
