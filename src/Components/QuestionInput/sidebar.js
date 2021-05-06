import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import QuestionCard from './questionCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  addBtn: {
    textAlign: "center",
    margin: theme.spacing(1)
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
}));

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {props.questions.map((text, index) => (
        <QuestionCard question={props.questions[index].question}
          correctAnswer={props.questions[index].correctAnswer}
          wrongAnswer={props.questions[index].wrongAnswer}
          selected={props.selected === index ? true : false}
          availableRemove={props.questions.length !== 1 ? true : false}
          setSelected={props.setSelected}
          index={index}
          remove={props.remove}
        />
      ))}
      {/* <List>
        {props.questions.map((text, index) => (
          <div>
                      {props.selected === index ? <Divider /> : ""}
          <ListItem button key={props.questions.question} onClick={() => props.setSelected(index)}>
            <ListItemIcon>{props.selected === index ? <ArrowForwardIosOutlinedIcon /> : <RemoveOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={props.questions[index].question} />
          </ListItem>
          {props.selected === index && props.questions.length !== 1 ? <Button onClick={() => props.remove(index)}><DeleteOutlineOutlinedIcon /></Button> : ""}
          {props.selected === index ? <Divider /> : ""}
          </div>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem button key={1} onClick={() => props.addClick()
          }>
            <ListItemIcon><AddCircleOutlineOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
      </List> */}
      <Divider />
      <div className={classes.addBtn}>
        <Button onClick={() => props.addClick()} variant="outlined" style={{ width: "50%" }}><AddCircleOutlineOutlinedIcon /></Button>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="permanent"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}


export default Sidebar;