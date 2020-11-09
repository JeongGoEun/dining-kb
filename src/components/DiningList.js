import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { DiningPaper } from './index';
import * as testData from '../static/testData.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function DiningList() {
  const classes = useStyles();
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    setRestaurantList(testData.data);
    console.log(restaurantList);
  }, [restaurantList]);

  return (
    <List className={classes.root}>
      {restaurantList.map((item) => (
        <ListItem alignItems="flex-start">
            <p>{item.name}</p>
          <DiningPaper info={item} />
        </ListItem>
      ))}
    </List>
    // <List className={classes.root} subheader={<li />}>
    //   {[0, 1, 2, 3, 4].map((sectionId) => (
    //     <li key={`section-${sectionId}`} className={classes.listSection}>
    //       <ul className={classes.ul}>
    //         <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
    //         {[0, 1, 2].map((item) => (
    //           <ListItem key={`item-${sectionId}-${item}`}>
    //             <ListItemText primary={`Item ${item}`} />
    //           </ListItem>
    //         ))}
    //       </ul>
    //     </li>
    //   ))}
    // </List>
  );
}
