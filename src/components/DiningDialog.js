import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import {DiningMenu} from './index'
import * as util from './util'

const axios = require('axios').default;
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  img: {
    display: 'inline',
    margin: '2% 4%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '5px',
    float: 'left   z',
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DiningDialog = withStyles(styles)((props) => {
  const { classes } = props;
  const [info, setDiningInfo] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let data = util.getRestaurantInfoFromLocal(props.id.toString());

    if(data) {
      setDiningInfo(data);
      setLoaded(true);
    } else {
      axios
      .get('http://192.168.62.122:8080/restaurants/' + props.id)
      .then((res) => {
        util.setRestaurantInfoToLocal(props.id, res.data);
        setDiningInfo(res.data);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div>
      {loaded && (
        <Dialog
          onClose={props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={props.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            {info.name}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container item spacing={3}>
              <Grid xs={4} item>
                <img
                  className={classes.img}
                  alt="complex"
                  src={info.imgUrl}
                />
              </Grid>
              <Grid item xs={8}>
                <List style={{ padding: '0' }}>
                  <ListItem>
                    <RoomOutlinedIcon
                      style={{ fontSize: '1.2rem', marginRight: '4px' }}
                    />
                    <Typography variant="body2">
                      {info.address}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <PhoneOutlinedIcon
                      style={{ fontSize: '1.2rem', marginRight: '4px' }}
                    />
                    <Typography variant="body2">
                      {info.phoneNumber}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <QueryBuilderOutlinedIcon
                      style={{ fontSize: '1.2rem', marginRight: '4px' }}
                    />
                    <Typography variant="body2">({info.operTime[0].day}) {info.operTime[0].time}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className={classes.listItem}
                      primary={info.grade.total+'점'}
                    />
                    <Typography variant="body2">{info.grade.number}명 평가</Typography>
                    <Rating name="read-only" value={info.grade.total} precision={0.5} readOnly />
                  </ListItem>
                  <ListItem>
                    {info.tag.slice(0,4).map((item, index) =>
                      <Chip key={item.id} label={'#'+item.name} size="small" style={{marginRight: '4px'}}/>
                    )}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Divider />
            <DiningMenu menu={info.menu} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
});

export default DiningDialog;
