import React from "react";
import countryList from 'react-select-country-list';
import './Third.css'
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    MobileStepper,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    IconButton
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';




export default class Third extends React.Component{
    constructor(){
        super();
        this.state = {
            country:"EG",
            lang:"en_US"
        }
    }

    collectInput=(e)=>{
      
        this.setState({[e.target.name]:e.target.value})
        
      }
    
      sendData=()=>{
          let data = {
              lang:this.state.lang,
              country:this.state.country
          }
          this.props.collect(data)
      }

    render(){
        let countryArr = countryList().getData()
        console.log(countryArr)
        let langList = require('lang-list')
        let languagesArr = langList.getList(
            { 
                supportedLangs: ['ar_AR', 'en_US', 'fr_FR', 'es_ES'], 
                strict: true
            }
        );
        console.log(languagesArr)

        return <Dialog open={this.props.open}  maxWidth='xs' fullWidth={false}>
        <DialogTitle  mt={2}>
        <IconButton
          aria-label="close"
          onClick={()=> this.props.switch("second")}
          sx={{
            position: 'absolute',
            left: 10,
            top: 10,
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
        activeStep={2}
        sx={{ maxWidth: 400, flexGrow: 1}}
        />
        </DialogTitle>
        <DialogContent sx={{textAlign:"center"}}>
       
        <DialogContentText my={10} >
        <Typography variant="h4" sx={{color:'black'}}>Pick your language and country/region</Typography>
        </DialogContentText>  
        <div style={{width:'100%', marginBottom:'1rem'}}>    
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
                labelId="country-selector-label"
                id="contry-selector"
                name="country"
                // defaultValue='EG'
                value={this.state.country}
                label="Country"
                onChange={this.collectInput}
            >
                {countryArr.map((item)=>{
                    return <MenuItem value={item.value}>{item.label}</MenuItem>
                })}

            </Select>
        </FormControl>
        </div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >Language</InputLabel>
            <Select
                labelId="language-selector-label"
                id="language-selector"
                label='Language'
                name="lang"
                // defaultValue="en_US"
                value={this.state.lang}
                onChange={this.collectInput}
                
            >   
                {languagesArr.map((item)=>{
                    return <MenuItem value={item.code}>{item.native}</MenuItem>
                })}
            </Select>
        </FormControl>
          
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
            marginTop:'5rem'
          }}
        >
        Next</Button>
        

        </DialogContent>

      </Dialog>
    }
}