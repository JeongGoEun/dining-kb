import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    width: '92%',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10,
  },
}));

export default function DiningList(props) {
  const classes = useStyles();
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const timer = useRef();

  const handleMoreClick = (e) => {
    e.preventDefault();
    if(!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
        setCount(count+5);
      }, 2000);
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div>
      <List className={classes.root}>
        {props.restaurantList.length > 0 &&
          props.restaurantList.slice(0,count).map((item, index) => (
            <ListItem alignItems="flex-start" key={item.name}>
              <DiningPaper info={item} index={index} onChangeIndex={props.onChangeIndex}/>
            </ListItem>
          ))}
      </List>
      <div className={classes.wrapper}>
        <Button
          onClick={handleMoreClick}
          variant="contained"
          className={classes.moreButton}
          disabled={loading}
        >
          더보기
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
