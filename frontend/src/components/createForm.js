import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from '../Api'
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";

let handleSubmit = async (e) => {
    const elements = e.target.form.elements
    await Api.createProcess({
        process_name: elements.processName.value,
        number_of_processes: elements.numCores.value,
        avg_time_delay: elements.delay.value,
    })
}

export default function ProcessForm (props) {
    return (
        <div>
            <Typography className={"ScreenName"} variant={"h3"} component={"div"}>
                {"Create Process"}
            </Typography>
            <br/><br/>
            <Paper elevation={3}>
                <Form>
                    <Form.Group className="mb-3" controlId="processName">
                        <Form.Label>Process Name</Form.Label>
                        <Form.Control type="Text" placeholder="Enter the name of the process" />
                        <Form.Text className="text-muted">
                            Name of the process
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="numCores">
                        <Form.Label>Number of parallel processes</Form.Label>
                        <Form.Control type="number" placeholder="Number of cores" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="delay">
                        <Form.Label>Average time to delay each process (s)</Form.Label>
                        <Form.Control type="number" placeholder="Average time to delay each process (s)" />
                    </Form.Group>
                    <Button variant="primary" type="reset" onClick={(e) => handleSubmit(e)}>
                        Submit
                    </Button>
                </Form>
            </Paper>
        </div>
    )
}