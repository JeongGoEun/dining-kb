import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const { kakao } = window;
const useStyles = makeStyles((theme) => ({
  mapStyle: {
    height: '600px',
  },
}));
const centerLocation = {
  lat: 37.541894, 
  lng: 126.949751
};

export default function Map(props) {
  const classes = useStyles();

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    props.restaurantList.forEach((item) => {
		// console.log(item)
		new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(item.lat, item.lng),
			title: item.name
		});
	});
  });

  return <div id="myMap" className={classes.mapStyle} />;
}
