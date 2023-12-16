import React from "react";
import { Space, Table, message } from "antd";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { useDispatch } from "react-redux";
import { setOpenedNavbar } from "../../../redux/userSlice";
import { NavbarLabel } from "../../bars/consts/enums";


const MedicinesTable = ({ data, setMedicinesData }) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const dispatch = useDispatch();
    const columns = [
        {
            title: "Medicine",
            dataIndex: "medicine",
            key: "medicine",
        },

        {
            title: "Dosage",
            dataIndex: "dosage",
            key: "dosage",
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (key) => (
                <Space size="middle">
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "#1677ff",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            let array = []
                            for (let item of data) {
                                if (item.key != key) {
                                    array.push(item)
                                }
                            }
                            setMedicinesData(array)
                        }}>
                        Delete Medicine
                    </button>

                </Space>
            ),
        },
    ];

    const handleReject = () => {
        console.log("Rejected");
        ``;
    };


    function snackbar() {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )

}
export default MedicinesTable;
