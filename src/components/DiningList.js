import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { DiningPaper } from './index';
import * as testData from '../static/testData.json';

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
    width: '92%'
  }
}));

export default function DiningList() {
  const classes = useStyles();
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    setRestaurantList(testData.data);
    console.log(restaurantList);
  }, [restaurantList]);

  return (
    <div>
      <List className={classes.root}>
        {restaurantList.map((item) => (
          <ListItem alignItems="flex-start">
            <DiningPaper info={item} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" className={classes.moreButton}>더보기</Button>
    </div>
  );
}
