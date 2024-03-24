export const SortOptions = {
  label: "Sort By: ",
  options: [
    { displayName: "Featured", value: "" },
    {
      displayName: "Price: Lowest",
      value: { sortBy: "price", sortType: "asc" },
    },
    {
      displayName: "Price: Highest",
      value: { sortBy: "price", sortType: "desc" },
    },
    {
      displayName: "Name: (A-Z)",
      value: { sortBy: "name", sortType: "asc" },
    },
    {
      displayName: "Name: (Z-A)",
      value: { sortBy: "name", sortType: "desc" },
    },
  ],
};
