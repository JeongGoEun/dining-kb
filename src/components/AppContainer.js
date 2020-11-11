import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {DiningList, Map} from './index'
import * as testData from '../static/testData.json';


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: 'rgb(255, 188, 0)',
    color: 'rgb(84, 80, 69)'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5),
  },
}));

export default function AppContainer() {
  const classes = useStyles();
  const kakaoMap = useRef();

  const onChangeIndex = (index, flag) => {
    // console.log('AppContainer on change index', index);
    //console.log(kakaoMap);
    if (flag) {
      kakaoMap.current.setOverlay(index);
    } else {
      kakaoMap.current.unsetOverlay(index);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dining KB
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        position="fixed"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <DiningList restaurantList = {testData.data} onChangeIndex={onChangeIndex}/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Map restaurantList = {testData.data} ref={kakaoMap}/>
      </main>
    </div>
  );
}
