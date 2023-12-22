export type Organization = {
  [x: string]: string | number | undefined;
  name: string;
  imageUrl: string;
};

type OrganizationMember = {
  email: string;
};
