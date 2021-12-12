import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "123",
      name: "White Mage",
      image:
        "https://d2jzgjupsopjbp.cloudfront.net/client_info/SQEX_ESTORE/itemimage/MWFF140560_3/ITEM_IMAGE2.jpg",
      places: 3,
    },
    {
      id: "124",
      name: "Scholar",
      image:
        "https://d2jzgjupsopjbp.cloudfront.net/client_info/SQEX_ESTORE/itemimage/MWFF140559_2/ITEM_IMAGE2.jpg",
      places: 2,
    },
    {
      id: "125",
      name: "Astrologian",
      image:
        "https://d2jzgjupsopjbp.cloudfront.net/client_info/SQEX_ESTORE/itemimage/MWFF140561_1/ITEM_IMAGE2.jpg",
      places: 1,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
