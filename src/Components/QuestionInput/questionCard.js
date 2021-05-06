import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  cardSelected: {
    backgroundColor: "#d6d6d6"
  }
}));

export default function QuestionCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
    props.setSelected(props.remove(props.index))
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
  <div>
    <Card className={classes.root}>
      <CardActionArea onClick = {() => {props.setSelected(props.index)}}>
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent className={props.selected ? classes.cardSelected : ""}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.question !== "" ? props.question : "Question"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.correctAnswer !== "" ? props.correctAnswer : "Correct Answer"}
            <br></br><br></br>
            {props.wrongAnswer !== "" ? props.wrongAnswer : "Wrong Answer"}

          </Typography>
        </CardContent>
      </CardActionArea>
        <Collapse in={props.availableRemove && props.selected ? true:false}>
        <CardActions>
          <Button size="small" color="primary" onClick = {handleClickOpen}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        </CardActions>
        </Collapse>
    </Card>


    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete test question"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this question? This can’t be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAccept} color="secondary" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}