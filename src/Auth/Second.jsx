import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    MobileStepper,
    FormControl,
    Radio,
    FormControlLabel,
    RadioGroup,
    IconButton
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


export default class Second extends React.Component{
    constructor(){
        super();
        this.state = {
            gender:""
        }
    }

    collectInput=(e)=>{
        this.setState({gender:e.target.value})
    }

    sendData=()=>{
        let data = {
          gender:this.state.gender,
        }
        this.props.collect(data)
        this.props.switch('third')

      }
  

    render(){
        let checked = this.state.gender;
        return <Dialog open={this.props.open}  maxWidth='xs' fullWidth={false}>
        <DialogTitle mb={9} mt={1}>
        <IconButton
          aria-label="close"
          onClick={()=> this.props.switch("first")}
          sx={{
            position: 'absolute',
            left: 17.5,
            top: 17.5,
            color:'black',
            fontWeight:'bold'
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={1}
        sx={{ maxWidth: 400, flexGrow: 1}}
        />
        </DialogTitle>
        <DialogContent sx={{textAlign:"center"}}>
       
        <DialogContentText my={5} >
        <Typography variant="h4" sx={{color:'black'}}>How do you identify?</Typography>
        </DialogContentText>  

        <FormControl component="fieldset" sx={{marginRight:'12rem'}}>
        <RadioGroup
            aria-label="gender"
            name="radio-buttons-group"
            value={this.state.gender}
            onChange={this.collectInput}
        >
            <FormControlLabel value="female" control={<Radio sx={{'&.Mui-checked':{color:'#e60023'}, marginRight:'0.75rem'}} />}
            label={<Typography variant="h6" sx={{color: checked==='female'?"#e60023":'black' }}>Female</Typography>} />
            
            <FormControlLabel value="male" control={<Radio  sx={{'&.Mui-checked':{color:'#e60023'}, marginRight:'0.75rem'}} />} 
            label={<Typography variant="h6" sx={{color:checked==='male'?"#e60023":'black'}}>Male</Typography>}  />
    
            <FormControlLabel value="other" control={<Radio sx={{'&.Mui-checked':{color:'#e60023'}, marginRight:'0.75rem'}} />}
             label={<Typography variant="h6" sx={{color:checked==='other'?"#e60023":'black'}}>Other</Typography>}  />
            
        </RadioGroup>
        </FormControl>

        <div style={{width:"80%", textAlign:"center", margin:'auto'}}>  
        <Button
          onClick={this.sendData}
          variant="contained" 
          size='large' 
          fullWidth
          sx={{
            backgroundColor:"#e60023", 
            '&:hover':{backgroundColor:"#e60023"}, 
            borderRadius:10,
            textTransform:'none',
            marginTop:'3rem'
          }}
        >
        Next</Button>
        </div>
        

        </DialogContent>

      </Dialog>
    }
}