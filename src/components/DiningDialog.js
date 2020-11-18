import React from 'react';
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
  title: {},
  img: {
    display: 'inline',
    margin: '2% 4%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '5px',
    float: 'left   z',
  },
  primary: {
    fontSize: 'small'
  },
  MuiTypographyBody1: {
    fontSize: 'small'
  },
  MuiListItemTextRoot: {
    marginBottom: '4px',
    marginLeft: '5px',
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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
  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.info.name}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item  spacing={3}>
            <Grid xs={4} item>
              <img
                className={classes.img}
                alt="complex"
                src={props.info.imgUrl}
              />
            </Grid>
            <Grid item xs={8}>
              <List style={{padding: '0'}}>
                <ListItem>
                  <RoomOutlinedIcon style={{fontSize: '1.2rem'}} />
                  <ListItemText classes={classes.primary} primary={props.info.address} prima/>
                </ListItem>
                <ListItem>
                  <PhoneOutlinedIcon style={{fontSize: '1.2rem'}}/>
                  <ListItemText style={{ fontSize: 'small' }} primary={props.info.phoneNumber} />
                </ListItem>
                <ListItem>
                  <QueryBuilderOutlinedIcon style={{fontSize: '1.2rem'}}/>
                  <ListItemText className={classes.listItem} primary="영업시간" />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.listItem} secondary="별점" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default DiningDialog;
