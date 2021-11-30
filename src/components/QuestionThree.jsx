import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom";
import {Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import AttachMoney from "./Q3_Comps/AttachMoney";
import "../styles/QuestionThree.scss";

export default function QuestionThree(props) {
  const navigate = useNavigate();

  const [pricePoint, setPricePoint] = useState([]);

  const handlePrice = (event, newPricePoints) => {
    setPricePoint(newPricePoints);
  };

  // each toggle button represents a price point option
  return(
    <Fragment>
    <div>
      <div className="page-number-display">
        3 of 4
      </div>
      <div className="centering">
        <h2 className="q3-question">How much are you willing to spend?</h2>
      </div>
      <div className="centering">
        <h3 className="q3-question-subtext">Pick one or multiple options</h3>
      </div>
      <div className="toggle-button-group">
      <ToggleButtonGroup
        value={pricePoint} 
        onChange={handlePrice} 
        fullWidth={false} 
        size={'large'} 
        color={'success'}>
        <ToggleButton value={1} style={{fontFamily: 'Quicksand, sans-serif', border: 'transparent'}}>
          <div>
          <AttachMoney/> <br/>
          Less Than $10
        </div>
        </ToggleButton>

        <ToggleButton value={2} style={{fontFamily: 'Quicksand, sans-serif', border: 'transparent'}}>
          <div>
            <AttachMoney/>
            <AttachMoney/> <br/>
            between $10 and $20
          </div>
        </ToggleButton>

        <ToggleButton value={3} style={{fontFamily: 'Quicksand, sans-serif', border: 'transparent'}}>
          < div>
            <AttachMoney/>
            <AttachMoney/>
            <AttachMoney/> <br/>
            between $20 and $30
          </div>
        </ToggleButton>

        <ToggleButton value={4} style={{fontFamily: 'Quicksand, sans-serif', border: 'transparent'}}>
          <div>
            <AttachMoney/>
            <AttachMoney/>
            <AttachMoney/>
            <AttachMoney/> <br/>
              greater than $30
          </div>
        </ToggleButton>
      </ToggleButtonGroup>
      </div>
      <div className="centering">
        <Button style={{backgroundColor: "#0198E1", fontFamily: 'Quicksand, sans-serif'}} variant="contained" onClick={() => {props.clickHandler(pricePoint); navigate("/results");}}>Next</Button>
      </div>
    </div>
    </Fragment>
  );
}