import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LocationOn from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import "../styles/QuestionOne.scss";

export default function QuestionOne(props) {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");

  return(
    <Fragment>
      <div className="question-one-container">
        <div className="page-number-display">
          1 of 4
        </div>
        <div className="summary">
          Need help deciding where to eat? EatsyPeasy can help! Answer some simple questions to see your customized selections and even send a poll to your friends!
        </div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 800, maxWidth: '100%'}}>
            <LocationOn 
              style={{ fill: '#0198E1' }} 
              sx={{ color: 'action.active', mr: 1, my: 1, fontSize: 40}} />
            <TextField 
              value={answer} 
              onChange={(event) => setAnswer(event.target.value)} 
              InputLabelProps={{style: {fontFamily: 'Quicksand, sans-serif'}}} 
              fullWidth id="input-with-sx" 
              label="What area do you want to eat in? Ex. Downtown, Vancouver"/>
          </Box>
        </Box>
        <Button 
          style={{backgroundColor: "#0198E1", fontFamily: 'Quicksand, sans-serif'}} variant="contained" 
          onClick={() => {props.clickHandler(answer); navigate('/questiontwo')}}>Next
        </Button>
      </div>
    </Fragment>
  );
}