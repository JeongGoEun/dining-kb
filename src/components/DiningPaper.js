import React, {useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  },
  paperStyle: {
    textAlign: 'start',
  },
}));

export default function DiningPaper(props) {
  const classes = useStyles();
  const [paperColor, setPaperColor]= useState('lavendar');

  const onMouseOver = (e) => {
    //console.log(props.index);
    setPaperColor('gainsboro');
    props.onChangeIndex(props.index, true);
  }

  const onMouseOut = (e) => {
    setPaperColor('lavender')
    props.onChangeIndex(props.index, false);
  }

  return (
    <div className={classes.root} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <Paper id={props.index} className={classes.paper} elevation={3} style={{backgroundColor: paperColor}}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKPdbK5h3mAfWZFUpg-RaHe5EkMur3anBRJA&usqp=CAU"
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
                <Typography gutterBottom variant="h5">
                  {props.info.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.info.menu.map(item => (
                    item.name + ", "
                  ))}
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
  );
}
