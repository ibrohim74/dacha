import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header_adminPage from "../../../components/header_adminPage";
import HostelPage from "./hostelPage/hostelPage";
import CreateHostel from "./CreateHostel/createHostel";
import { GetHostelsAPI } from "./API/hostelAPI";

const Hostel = () => {
  const [hostel, setHostel] = useState([]);
  useEffect(() => {
    GetHostelsAPI().then((r) => {
      setHostel(r);
    });
  }, []);

  return (
    <Box m={"20px"}>{hostel?.length ? <HostelPage /> : <CreateHostel />}</Box>
  );
};

export default Hostel;
