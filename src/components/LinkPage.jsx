import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Clipboard from 'clipboard/dist/clipboard.min'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import "../styles/LinkPage.scss"

export default function LinkPage(props) {
  
  // we had to use the useLocation hook here in order to access the appropriate alpha_numeric_id per poll generated in the "Results" component
  const location = useLocation();
  // Clipboard allows us to easily copy the poll link to then send to others
  new Clipboard('.btn')
  const navigate = useNavigate();

  return (
    <Fragment>
    <div className="linkpage-text">
      <h1>Unique link to share with your friends:</h1>
      <div id="link-text">
      https://eatsypeasy.netlify.app/poll/{location.state.poll.alpha_numeric_id}
      <IconButton aria-label="Copy to clipboard" className="btn" data-clipboard-target="#link-text">
        <ContentCopyIcon alt="Copy to clipboard"></ContentCopyIcon>
      </IconButton>
      </div>
    <Button 
    style={{backgroundColor: "#0198E1", fontFamily: 'Quicksand, sans-serif'}} variant="contained" 
    onClick={() => {navigate(`../poll/${location.state.poll.alpha_numeric_id}`);}}>Vote
    </Button>
    </div>
    </Fragment>
  )
}