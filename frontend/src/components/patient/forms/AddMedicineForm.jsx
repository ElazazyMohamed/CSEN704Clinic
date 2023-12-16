import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

const AddMedicineForm = ({ setMedicinesData, medicinesData2 }) => {
    const [name, setName] = useState("")
    const [dosage, setDosage] = useState("")
    const [duration, setDuration] = useState("")


    return (

        <FormControl

            fullWidth component={Paper} sx={{ padding: 2 }}>
            <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                margin="normal"
                sx={{ width: "80%", alignSelf: "center" }}
                name="Name"
                autoComplete="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <TextField
                id="outlined-basic"
                label="Dosage"
                variant="outlined"
                margin="normal"
                sx={{ width: "80%", alignSelf: "center" }}
                name="Dosage"
                autoComplete="Dosage"
                value={dosage}
                onChange={(event) => setDosage(event.target.value)}
            />

            <TextField
                id="outlined-basic"
                label="Duration"
                variant="outlined"
                margin="normal"
                sx={{ width: "80%", alignSelf: "center" }}
                name="Duration"
                autoComplete="Duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
            />


            <Button
                onClick={() => {
                    let array = [...medicinesData2]
                    array.push({ 'medicine': name, 'dosage': dosage, 'duration': duration })

                    setMedicinesData(array)
                }}
                sx={{
                    width: "30%",
                    alignSelf: "center",
                    marginTop: 2,
                    marginBottom: 2,
                }}
            >
                Submit
            </Button>
        </FormControl>
    );
};
export default AddMedicineForm;

