export type Organization = {
  [x: string]: string | number | undefined
  name: string
  imageUrl: string
}

export type OrganizationMember = {
  email: string
}

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "ACTIONS", uid: "actions" }
]
