import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.css'

export default function navbar (props) {
    return (
        <Box className="NavBar" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit">Scenarios</Button>
                        <Button color="inherit">Refinery</Button>
                    </Typography>
                    <div>

                    </div>
                    <Typography variant={"h6"} component="div" >
                        {props.refinery}
                    </Typography>
                    <LocalGasStationIcon/>

                    <IconButton aria-label={props.currentUser} color={"inherit"}>
                        {props.currentUser}
                        <LogoutIcon/>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Box>
    );
}