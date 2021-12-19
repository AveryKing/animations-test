import {Box, Grid, Grow, Paper} from "@mui/material";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    setTimeout(() => {
        setShowWelcome(false);
    }, 2300)
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Paper sx={{
                borderRadius: '15px',
                backgroundColor: "rgba(255,255,255,0.59)",
                paddingTop: '7.2rem',
                paddingBottom: '7.2rem',
                paddingLeft: '3.5rem',
                paddingRight: '3.5rem',
            }} elevation={15}>

                <Grid item xs={12} sx={{
                    display: 'block',
                    padding: '20px',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Grow in={showWelcome}>
                        <Box>
                            <FontAwesomeIcon
                                style={{position: 'relative', bottom: '100%'}}
                                color='#66bb6a'
                                size='6x'
                                icon={faCheckCircle}/>
                        </Box>
                    </Grow>
                    <br/>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Welcome