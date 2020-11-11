import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { DiningPaper } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  moreButton: {
    marginBottom: '5%',
    width: '92%',
  },
}));

export default function DiningList(props) {
  const classes = useStyles();
  function handleMoreClick(e) {
    e.preventDefault();
    console.log('more clicku');
  }

  return (
    <div>
      <List className={classes.root}>
        {props.restaurantList.length > 0 &&
          props.restaurantList.map((item, index) => (
            <ListItem alignItems="flex-start" key={item.name}>
              <DiningPaper info={item} index={index}/>
            </ListItem>
          ))}
      </List>
      <Button
        onClick={handleMoreClick}
        variant="contained"
        className={classes.moreButton}
      >
        더보기
      </Button>
    </div>
  );
}
