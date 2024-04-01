export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};

export const formatNumberIndianStyle = (x) => {
  if (typeof x === "number") {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  } else {
    return x;
  }
};
