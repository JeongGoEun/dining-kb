import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function DiningMenu(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <h3 className={classes.title}>메뉴</h3>
          <div className={classes.demo}>
            <List dense>
              {props.menu.map((item) => (
                <ListItem id={item.id}>
                  <ListItemText primary={item.name}/>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <h3 className={classes.title}>가격</h3>
          <div className={classes.demo}>
            <List dense>
              {props.menu.map((item) => (
                <ListItem id={item.id}>
                  <ListItemText primary={item.price} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
