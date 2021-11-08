import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProcessForm (props) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="processName">
                <Form.Label>Process Name</Form.Label>
                <Form.Control type="Text" placeholder="Enter the name of the process" />
                <Form.Text className="text-muted">
                    Name of the process
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Number of parallel processes">
                <Form.Label>Number of parallel processes</Form.Label>
                <Form.Control type="number" placeholder="Number of cores" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Time delay">
                <Form.Label>Average time to delay each process (s)</Form.Label>
                <Form.Control type="number" placeholder="Average time to delay each process (s)" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}