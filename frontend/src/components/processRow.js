import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';

import './processRow.css'

class ProcessRow extends React.Component {
    constructor(props) {
        super(props);
    }

    handleActionButton(){
        this.props.handleToggleModal();
        this.props.handleSelectProcess(this.props.process.id);
    }

    render() {
        return (
            <Paper elevation={3} className={"ProcessRow"}>
                <div className={"processRowWrapper"}>
                    <div className={"ProcessRowTitle"}>
                        <Typography className={"ScreenName"} variant={"h6"} component={"div"}>
                            {this.props.process.process_name}
                        </Typography>
                    </div>
                    <div className={"ProcessRowAction"}>
                        <IconButton color={"primary"} onClick={this.handleActionButton.bind(this)}>
                            <ListIcon/>
                        </IconButton>
                    </div>
                </div>
            </Paper>
        )
    }
}


export default ProcessRow;
