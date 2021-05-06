import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import DragAndDrop from '../DragAndDrop';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign: 'center'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  mainQuestion: {
    width: '80%',
    margin: theme.spacing(1)
  },
  answerOptions: {
    width: '40%',
    margin: theme.spacing(1)
  },
  fileInput: {
    width: '80%',
  }
}));

function InputArea(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawer} aria-label="mailbox folders" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.inputList[props.selected] === undefined && <Typography variant='h4'>Please select a question on the left</Typography>}
        {props.inputList[props.selected] !== undefined &&
          <div>
            <Typography variant="h1">
              {props.selected + 1}
            </Typography>
            <TextField
              label="Question"
              variant="filled"
              name="question"
              placeholder="Enter a question"
              value={props.inputList[props.selected].question}
              className={classes.mainQuestion}
              onChange={(e) => props.inputChange(e, props.selected)}
              inputProps={{
                maxLength: 100,
                style: { fontSize: 30, textAlign: 'center'},
              }}
            />
            <br></br>

              <div></div>

            <TextField
              label="Correct Answer"
              variant="outlined"
              name="correctAnswer"
              placeholder="Enter the correct answer"
              value={props.inputList[props.selected].correctAnswer}
              className={classes.answerOptions}
              onChange={(e) => props.inputChange(e, props.selected)}
              multiline
              inputProps={{ maxLength: 80 }}
            />
            <TextField
              label="Wrong Answer"
              variant="outlined"
              name="wrongAnswer"
              placeholder="Enter the wrong answer"
              value={props.inputList[props.selected].wrongAnswer}
              className={classes.answerOptions}
              onChange={(e) => props.inputChange(e, props.selected)}
              multiline
              inputProps={{ maxLength: 80 }}
            />
          </div>
        }
      </main>
    </div>
  );
}


export default InputArea;
