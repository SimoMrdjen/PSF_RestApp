import logo from "../logo.svg";
import React, { useState, useEffect } from "react";
import { raiseStatusZakList, getZakList } from "../api/client-api";
import { successNotification, errorNotification } from "./Notification";
import {
  Table,
  Spin,
  Empty,
  Button,
  Tag,
  Badge,
  Popconfirm,
  Radio,
} from "antd";

function StatusZakList({
  selectedItemCancel,
  selectedItemStatus,
  access_token,
}) {
  const [zbs, setZbs] = useState([]);
  const [zb, setZb] = useState();

  const columnsZbs =
    //fetchUsers =>
    [
      {
        title: "Datum",
        dataIndex: "date",
        key: "date",
        width: 100,
      },
      {
        title: "Godina.",
        dataIndex: "year",
        key: "year",
        width: 100,
      },
      {
        title: "Verzija",
        dataIndex: "version",
        key: "version",
        width: 100,
      },
      {
        title: "Jbbk",
        dataIndex: "jbbk",
        key: "jbbk",
        width: 150,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 140,
      },
      {
        title: "Actions ",
        dataIndex: "actions",
        render: (text, zb) => (
          <Radio.Group>
            <Popconfirm
              placement="topRight"
              title={`Da lis ste sigurni da zelite da poidgnete status ovom obrascu? `}
              onConfirm={() => {
                raiseStatusZakList(60, access_token);
                //setZb(zb);
              }}
              //add method to fetch user
              okText="Yes"
              cancelText="No"
            >
              <Radio.Button value="small">Edit</Radio.Button>
            </Popconfirm>
          </Radio.Group>
        ),
        width: 100,
      },
    ];

  const fetchZakList = (access_token) =>
    getZakList(access_token)
      .then((res) => res.json())
      .then((data) => {
        console.log("from fetc users", access_token);
        setZbs(data);
      })
      .catch((err) => {
        err.response.json().then((res) => {
          errorNotification(
            "There was an issue",
            `${res.message} [${res.status}] [${res.error}]`
          );
        });
      })
      .finally();

  return (
    <div>
      <h2>Zaklucni list</h2>
    </div>
  );
}

export default StatusZakList;
