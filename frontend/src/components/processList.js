import Typography from "@mui/material/Typography";
import React from "react";
import ProcessRow from './processRow';
import ProgressModal from './progressModal';
import Api from '../Api'

let processes = [];


export default class ProcessList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            processList: processes,
            showModal: false,
            selectedProcessID: undefined,
        }
        this.handleToggleModal.bind(this);
        this.handleSelectProcess.bind(this);
    }

    async componentWillMount() {
        const {ok, data} = await Api.getProcessList()
        if (ok) {
            this.setState({processList: data})
        }
    }

    processById(processId) {
        return this.state.processList.find(p => p.id === processId)
    }

    handleToggleModal (){
        this.setState(prevState => ({showModal: !prevState.showModal}))
    }

    handleSelectProcess(processId){
        this.setState({selectedProcessId: processId})
    }

    render() {
        return (
            <div>
                <Typography className={"ScreenName"} variant={"h3"} component={"div"}>
                    {"Process List"}
                </Typography>
                <br/><br/>
                {this.state.processList.map((process) => {
                    return (<ProcessRow key={process.id} process={process} handleToggleModal={this.handleToggleModal.bind(this)} handleSelectProcess={this.handleSelectProcess.bind(this)}/> )
                })}
                <ProgressModal show={this.state.showModal} currentProcess={this.processById(this.state.selectedProcessId)} handleClose={this.handleToggleModal.bind(this)}/>
            </div>
        )
    }

}

