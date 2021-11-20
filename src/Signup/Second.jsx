import React from "react";
import './Second.css'
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
    RadioGroup
} from "@mui/material";


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

    render(){
        let checked = this.state.gender;
        console.log(checked)
        return <Dialog open={true} onClose={this.props.close} maxWidth='xs' fullWidth={false}>
        <DialogTitle mb={9} mt={2}>
        <MobileStepper
        variant="dots"
        steps={4}
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
          
        <Button
          onClick={()=> this.props.collect(this.state.gender)}
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
        

        </DialogContent>

      </Dialog>
    }
}