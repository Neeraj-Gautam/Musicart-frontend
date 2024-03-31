export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) return true;
  return false;
};
