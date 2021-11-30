import React from 'react';
import NavigationBar from '../components/navigationbar/NavigationBar'
    
import { 
    Container, 
    Grid, 
    Button, 
    TextField, 
    Typography, 
    DialogTitle,
} from "@mui/material";


class ResetPassInput extends React.Component{
    constructor(){
        super();
        this.state = {email:''}
    };

    collectInput=(e)=>{
      
        this.setState({[e.target.name]:e.target.value});
        
    }

    sendData=()=>{

    }

    render(){
        return <Grid container direction="row" justifyContent="center" alignItem="center" mt={5}>

            <Grid item xs={12} sm={8} md={6} sx={{textAlign:"center"}}>
                <DialogTitle>
                    <Typography variant='h5'>
                        Let's find your Pinterest account
                    </Typography>
                    <Typography variant='subtitle1'>
                        Please put your email down there
                    </Typography>
                </DialogTitle>
                <Grid container  spacing={1} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={8}sx={{textAlign:"center"}}>
                <TextField
                    autoFocus
                    required
                    sx={this.props.inputStyle}
                    fullWidth
                    margin="dense"
                    name="email"
                    id="email"
                    label="email"
                    type="text"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.collectInput}
                />
                </Grid>
                <Grid item xs={12} sm={2} sx={{textAlign:"center"}}>
                <Button
                    onClick={this.sendData}
                    fullWidth
                    size="large"
                    variant="contained"  
                    sx={{
                        backgroundColor:"#e60023", 
                        '&:hover':{backgroundColor:"#e60023"}, 
                        borderRadius:10,
                        textTransform:'none',
                    }}
                >
                Next</Button>
                </Grid>
                </Grid>
            </Grid>
        </Grid>

    }
}

export default class PwReset extends React.Component{
    constructor(){
        super()
        this.state = {}
    };

    render(){
        const CssTextField = {
            '& label.Mui-focused': {
              color: '#e60023',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#e60023',
            },
            '& .MuiOutlinedInput-root': {
              maxHeight:'50px',
              borderRadius:20,
              '&.Mui-focused fieldset': {
                borderColor: '#e60023',
                borderWidth:3,
                
              },
            },
          };
        return <div style={{width:'100%'}}>
            
            <Container>
            <ResetPassInput inputStyle={CssTextField}/>
        </Container> 
        </div>
    }
}