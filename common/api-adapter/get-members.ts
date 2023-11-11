export const makeApiCall = async (apiBaseUrl: string | undefined) => {
  const res = await fetch(`${apiBaseUrl}/members`);
  const data = await res.json();
  console.log(data);
};
