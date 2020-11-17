import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {DiningDialog} from './index'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 400,
    backgroundColor: 'lavender',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '5px',
  },
  paperStyle: {
    textAlign: 'start',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DiningPaper(props) {
  const classes = useStyles();
  const [paperColor, setPaperColor] = useState('lavendar');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onMouseOver = (e) => {
    setPaperColor('gainsboro');
    props.onChangeIndex(props.index, true);
  };

  const onMouseOut = (e) => {
    setPaperColor('lavender');
    props.onChangeIndex(props.index, false);
  };

  return (
    <div
      className={classes.root}
    >
      <div
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={handleClickOpen}
      >
        <Paper
          id={props.index}
          className={classes.paper}
          elevation={3}
          style={{ backgroundColor: paperColor }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={props.info.imgUrl}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                className={classes.paperStyle}
              >
                <Grid item xs>
                  <h3>{props.info.name}</h3>
                  <Typography variant="body2" gutterBottom>
                    {props.info.menu
                      .map((item) => item.name + ', ')
                      .slice(0, 3)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {props.info.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <DiningDialog handleClose={handleClose} open={open} info={props.info}/>
    </div>
  );
}
