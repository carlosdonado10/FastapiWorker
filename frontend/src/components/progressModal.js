import React from 'react';
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import SubProcessRow from './subprocessRow'
import Api from '../Api'

import './progressModal.css'


export default class ProgressModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subProcesses: {},
            interval: undefined,
        }
        this.handleCloseLocal.bind(this);
    }

    startInterval() {
        this.interval = setInterval(async () => {
            const {ok, data} = await Api.getProgress(this.props.currentProcess.id)
            if (ok) {
                debugger
                this.setState({subProcesses: data})
            }
        }, 100)
    }

    stopInterval() {
        clearInterval(this.interval)
    }

    async componentDidUpdate(prevProps, prevState){
        if (prevProps.currentProcess === undefined && this.props.currentProcess !== undefined ){
            const {ok, data} = await Api.getProgress(this.props.currentProcess.id)
            if (ok) {
                this.setState({subProcesses: data})
                this.startInterval()
            }
        } else if ((prevProps.currentProcess||{}).id !== (this.props.currentProcess || {}).id){
            const {ok, data} = await Api.getProgress(this.props.currentProcess.id)
            if (ok) {
                this.setState({subProcesses: data})
                this.startInterval()
            }
        }

    }

    handleCloseLocal() {
        this.props.handleClose();
        this.stopInterval()
    }


    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.handleToggleModal}>
                <Modal.Header closeButton onClick={this.handleCloseLocal.bind(this)}>
                    <Modal.Title>Sub Process Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(this.state.subProcesses).map(id => {
                        return (<SubProcessRow key={id} subProcessId={id} progress={this.state.subProcesses[id] * 100}/>)
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseLocal.bind(this)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}