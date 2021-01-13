import React, { useState } from 'react';

import './styles.css';
import MessageItem from './MessageItem';
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ChatArea = ({ jumpTo, stepHistory, chats }) => {
  const [messages, setMessages] = useState([]);
  const [steps, setSteps] = useState(stepHistory);
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setSteps(stepHistory)
  }, [stepHistory])

  React.useEffect(() => {
    setMessages(chats)
  }, [chats])
  return (
    <Grid container style = {{}}>
      <Card className={'pageChatRoomContainer'} style={{ border: "5px solid brown" }} >
        <CardContent className='pageChatRoomHeader' style = {{minHeight: "10vh"}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ width: "90%" }}>
            <Tab label="Nước đi" {...a11yProps(0)} style={{ color: "white", fontSize: "80%" }} />
            <Tab label="Trò chuyện" {...a11yProps(1)} style={{ color: "white", fontSize: "80%" }} />
          </Tabs>
        </CardContent>
        <CardContent className='pageChatRoomBody'style = {{minHeight: "90vh"}} >
          <Grid>
            {
              value === 0 ?
                steps.map((step, move) => {
                  const desc = move ?
                    'Go to move #id' + move + " ( " + Math.floor(step.position / 20) + ", " + step.position % 20 + " )" :
                    'Go to game start';
                  return (
                    <li key={move} style={{ marginTop: "2vh", minWidth: "-webkit-fill-available" }}>
                      <button className={`myButton ${move === currentStep ? 'ready' : ''}`} onClick={() => { jumpTo(move); setCurrentStep(move) }} style={{ minWidth: "90%" }}>{desc}</button>
                    </li>
                  );
                })
                :
                messages.map((message, index) => {
                  return (

                    <div className='guestContainer'>
                      <MessageItem name={message.name} index={index} typePlayer='guest' content={message.content} time={message.time} />
                    </div>
                  )
                })
            }
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default ChatArea;