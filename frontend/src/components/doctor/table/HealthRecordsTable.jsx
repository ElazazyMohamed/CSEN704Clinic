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


const HealthRecordsTable = ({ data }) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const dispatch = useDispatch();
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },

        {
            title: "Uploaded By",
            dataIndex: "uploaded by",
            key: "uploaded by",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "File",
            dataIndex: "file",
            key: "file",
        },
        {
            title: "Doctor Notes",
            dataIndex: "doctor notes",
            key: "doctor notes",
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
export default HealthRecordsTable;
