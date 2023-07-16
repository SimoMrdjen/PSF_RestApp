import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveZakljucni } from "../api/client-api";
import MainForma from "../MainForma";

function ZakljucniList({ access_token }) {
  const [message, setMessage] = useState("");

  return <h5>This is register</h5>;
}

export default ZakljucniList;
