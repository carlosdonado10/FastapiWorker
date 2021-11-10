import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import { ProgressBar  } from 'react-bootstrap';

import './subprocessRow.css'

class ProcessRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper elevation={3} className={"ProcessRow"}>
                <div className={"processRowWrapper"}>
                    <div className={"subProcessRowTitle"}>
                        <Typography className={""} variant={"h9"} component={"div"}>
                            {this.props.subProcessId}
                        </Typography>
                    </div>
                    <div className={"subProcessRowAction"}>
                        <ProgressBar now={this.props.progress}/>
                    </div>
                </div>
            </Paper>
        )
    }
}


export default ProcessRow;
