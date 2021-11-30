import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
// the search bar comp + autocomplete
import FreeSolo from "./Q2_Comps/Input_Autocomplete_Comp";
// the table comp
import DenseTable from "./Q2_Comps/Table_Comp";
// the checkboxes comp
import CheckboxesGroup from "./Q2_Comps/Checkboxes_Comp";
import "../styles/QuestionTwo.scss";


export default function QuestionTwo(props) {
  const navigate = useNavigate();

  const [choices, setChoices] = useState([]);
  const [dietaryPrefs, setDietaryPrefs] = useState([]);

  // this function concatenates the two arrays of food query params (choices and dietaryprefs) which will be used to update the questiontwo state
  const finalQuestionTwoState = (choices, dietaryPrefs) => {
    const answerArray = choices.concat(dietaryPrefs);
    return answerArray;
  }

  // adds a "choice" option to the choices state array
  const addChoice = (choice) => {
    // you are not allowed to add the same choice twice
    if (choices.includes(choice)) {
      return
    }

    // this ensures that we are not accidentally adding "null" choices
    if (choice !== null) {
      setChoices((prev) => ([...prev, choice]));
    }
  };

  // removes a "choice" option from the choices state array
  const removeChoice = (choice) => {
    const choicesList = [...choices];
    for (let i = 0; i < choicesList.length; i++) {
      if (choice === choicesList[i]) {
        choicesList.splice(i, 1);
        setChoices(choicesList);
        return;
      }
    }
  }

  // adds a dietary preference option to the dietaryPrefs state array
  const addDietaryPref = (dietaryPref) => {
    setDietaryPrefs((prev) => ([...prev, dietaryPref]));
  }

  // removes a dietary preference option from the dietaryPrefs state array
  const removeDietaryPref = (dietaryPref) => {
    const dietaryPrefList = [...dietaryPrefs];
    for (let i = 0; i < dietaryPrefList.length; i++) {
      if (dietaryPref === dietaryPrefList[i]) {
        dietaryPrefList.splice(i, 1);
        setDietaryPrefs(dietaryPrefList);
        return;
      }
    }
  }

  return(
    <Fragment>
      <div className="page-number-display">
        2 of 4
      </div>
      <div className="all-components-less-button">
        <FreeSolo className="search-bar" onClick={addChoice}/>
        <br />
        <div className="table-and-checklist">
          {choices.length > 0 && <DenseTable foodCategories={choices} deleteFoodCategory={removeChoice}/>}
          <CheckboxesGroup onCheck={addDietaryPref} onUncheck={removeDietaryPref}/>
        </div>
      <Button style={{backgroundColor: "#0198E1", fontFamily: 'Quicksand, sans-serif'}} variant="contained" onClick={
        () => {
          props.clickHandler(finalQuestionTwoState(choices, dietaryPrefs)); 
          navigate('/questionthree'); 
        }
      }>Next</Button>
      </div>
    </Fragment>
  );
}