export const getMembers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/members`);
  const data = await res.json();
  return data;
};
