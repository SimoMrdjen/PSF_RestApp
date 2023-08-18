import logo from "../logo.svg";
import React, { useState, useEffect } from "react";
import { raiseStatusZakList, getZakList,stornoZakList } from "../api/client-api";
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
  setSelectedItemStatus,
  setSelectedItemCancel,
  access_token,
}) {
  const [zbs, setZbs] = useState([]);
  const [zb, setZb] = useState();

  const columnsZbs =
    //fetchUsers =>
    [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 20,
      },
      {
        title: "Datum",
        dataIndex: "date",
        key: "date",
        width: 60,
      },
      {
        title: "Godina.",
        dataIndex: "year",
        key: "year",
        width: 30,
      },
            {
              title: "Kvartal",
              dataIndex: "kvartal",
              key: "kvartal",
              width: 10,
            },
      {
        title: "Verzija",
        dataIndex: "version",
        key: "version",
        width: 20,
      },
      {
        title: "Jbbk",
        dataIndex: "jbbk",
        key: "jbbk",
        width: 50,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 20,
      },
      {
        title: "Akcija ",
        dataIndex: "actions",
        render: (text, zb) => (
          <Radio.Group>
            { selectedItemStatus && <Popconfirm
              placement="topRight"
              title={`Da lis ste sigurni da zelite da poidgnete status ovom obrascu? `}
              onConfirm={() => {
              let token = localStorage.getItem("token");
                raiseStatusZakList(zb.id, token)
                  .then((response) => {
                    console.log(response);
                    return response.text(); // Get the text content from the response
                  })
                  .then(
                    (text) => {
                      successNotification(
                        "Uspesno podignut status obrasca!",
                        text
                      );
                      setSelectedItemStatus(null);
                    }
                  )
                  .finally();
              }}
              okText="Yes"
              cancelText="No"
            >
              <Radio.Button
                            type="primary"
                            value="small"
                            danger
                            style={{ background: '#99ff99', borderColor: '#99ff99', color: 'grey' }}
              >
              Podigni status
              </Radio.Button>
            </Popconfirm>
            }
            { selectedItemCancel && <Popconfirm
                          placement="topRight"
                          title={`Da lis ste sigurni da zelite da stornirate ovaj obrazac? `}
                          onConfirm={() => {
                          let token = localStorage.getItem("token");
                            stornoZakList(zb.id, token)
                              .then((response) => {
                                console.log(response);
                                return response.text(); // Get the text content from the response
                              })
                              .then(
                                (text) => {
                                  successNotification(
                                    "Obrazac je uspešno storniran!!",
                                    text
                                  );
                                  setSelectedItemCancel(null);
                                }
                              )
                              .finally();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                        <Radio.Button
                            type="primary"
                            value="small"
                            danger
                            style={{ background: 'transparent', borderColor: 'red', color: 'red' }}
                        >
                          Storniraj obrazac</Radio.Button>
                        </Popconfirm>}
          </Radio.Group>
        ),
        width: 120,
      },
    ];

  const fetchZakList = (access_token) =>
    getZakList(access_token)
      .then((res) => res.json())
      .then((data) => {
        console.log("from fetc users", access_token);
        setZbs(data);
      })
    .catch((error) => {
        setSelectedItemStatus(null);
    });


  useEffect(() => {
    console.log("component is mounted");
    let token = localStorage.getItem("token");
    fetchZakList(token);
    console.log("Token from AdminForm: ", access_token);
  }, []);

  return (
    <Table
      dataSource={zbs}
      columns={columnsZbs} //fetchUsers)}
      bordered
      pagination={ false }
      //scroll={{ y: 600 }}
     rowKey={(zb) => zb.id}
    />
  );
}

export default StatusZakList;
