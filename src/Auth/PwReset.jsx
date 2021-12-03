import React from 'react';
import NavigationBar from '../components/navigationbar/NavigationBar'
import { Link } from 'react-router-dom';
import axiosInstance from './axios/Base';
import {
    Container,
    Grid,
    Button,
    TextField,
    Typography,
    DialogTitle,
} from "@mui/material";


class ResetPassInput extends React.Component {
    constructor() {
        super();
        this.state = { email: '' }
    };

    collectInput = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    sendData = () => {

        axiosInstance
            .post('/account/password-reset-request', {
                "email": this.state.email,
                "redirect_url": "http://3.132.156.164/password-reset/confirm"
            })
            .then(res => {
                if (res.data.success) {
                    this.props.getEmail(this.state.email)
                    this.props.switch("sent")
                }
            }).catch(err => {
                console.log(err)
                this.props.getError(err)
            })
    }

    render() {
        return <Grid container direction="row" justifyContent="center" alignItem="center" mt={5}>

            <Grid item xs={12} sm={8} md={6} sx={{ textAlign: "center" }}>
                <DialogTitle>
                    <Typography variant='h5'>
                        Let's find your Pinterest account
                    </Typography>
                    <Typography variant='subtitle1'>
                        Please put your email down there
                    </Typography>
                </DialogTitle>
                <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={8} sx={{ textAlign: "center" }}>
                        <TextField
                            autoFocus
                            required
                            sx={this.props.inputStyle}
                            fullWidth
                            margin="dense"
                            name="email"
                            id="email"
                            label="email"
                            type="email"
                            variant="outlined"
                            value={this.state.email}
                            onChange={this.collectInput}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
                        <Button
                            onClick={this.sendData}
                            fullWidth
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: "#e60023",
                                '&:hover': { backgroundColor: "#e60023" },
                                borderRadius: 10,
                                textTransform: 'none',
                            }}
                        >
                            Send email</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    }
}

class ResetPassSent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        return <Grid container direction="row" justifyContent="center" alignItem="center" mt={5}>
            <Grid item xs={12} sm={8} md={5} sx={{ textAlign: "center" }}>
                <DialogTitle>
                    <Typography variant='h5'>
                        Email Sent
                    </Typography>
                    <Typography variant='subtitle1'>
                        we sent an email to <span style={{ fontWeight: 'bold' }}>{this.props.email}eve.holt@reqres.in!</span> if this email
                        is connected to Pinterest account , you will be able to reset your password
                    </Typography>
                    <Typography variant='subtitle1'>
                        Didn't get the email?
                    </Typography>
                </DialogTitle>
                <Grid container direction="row" justifyContent="center" alignItem="center">
                    <Grid item xs={10} sm={3} sx={{ textAlign: "center" }}>
                        <Button
                            LinkComponent={Link}
                            to='/password-reset'
                            fullWidth
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: "#efefef",
                                color: 'black',
                                '&:hover': { backgroundColor: "#efefef", color: 'black', },
                                borderRadius: 10,
                                textTransform: 'none',
                            }}
                        >
                            Try Again</Button>
                    </Grid>
                    <Grid item xs={10} sm={3} sx={{ textAlign: "center" }}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            LinkComponent={Link}
                            to='/'
                            sx={{
                                backgroundColor: "#e60023",
                                '&:hover': { backgroundColor: "#e60023" },
                                borderRadius: 10,
                                textTransform: 'none',
                            }}
                        >
                            Home</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    }
}

export default class PwReset extends React.Component {
    constructor() {
        super()
        this.state = {
            Cscreen: "input",
            email: ""
        }
    };

    switchScreen = (screen) => {
        this.setState({ Cscreen: screen })
    }

    getEmail = (email) => {
        this.setState({ email: email })
    }

    render() {
        const CssTextField = {
            '& label.Mui-focused': {
                color: '#e60023',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#e60023',
            },
            '& .MuiOutlinedInput-root': {
                maxHeight: '50px',
                borderRadius: 20,
                '&.Mui-focused fieldset': {
                    borderColor: '#e60023',
                    borderWidth: 3,

                },
            },
        };
        return <Container>
            {
                this.state.Cscreen === "input" &&
                <ResetPassInput getEmail={this.getEmail} switch={this.switchScreen} inputStyle={CssTextField} />
            }
            {
                this.state.Cscreen === "sent" &&
                <ResetPassSent email={this.state.email} switch={this.switchScreen} inputStyle={CssTextField} />
            }


        </Container>

    }
}