import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

const { kakao } = window;
const useStyles = makeStyles((theme) => ({
    mapStyle: {
        height: "600px"
    }
  }));
const centerLocation = {
    "lat": 37.5541032,
    "lon": 126.9436653
}

export default function Map() {
    const classes = useStyles();

    useEffect(() => {
        const container = document.getElementById("myMap");
        const options = {
            center: new kakao.maps.LatLng(centerLocation.lat,centerLocation.lon),
            level: 3
        }
        const map = new kakao.maps.Map(container, options)
    }, [])


    return (
        <div id="myMap" className={classes.mapStyle} />
    )
}