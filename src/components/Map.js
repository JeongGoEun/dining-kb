import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const { kakao } = window;
const useStyles = makeStyles((theme) => ({
  mapStyle: {
    height: '680px',
  },
}));
const centerLocation = {
  lat: 37.541894,
  lng: 126.949751,
};
const imgPath =
  'data:image/jpeg;base64,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';
export default function Map(props) {
  const classes = useStyles();
  const [map, setMap] = useState(Object);
  const [overlayArr, setOverlayArr] = useState([]);
  
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();

    props.restaurantList.forEach((item) => {
      geocoder.addressSearch(item.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(result);
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            clickable: true,
          });

          var content =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            item.name +
            '        </div>' +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="' +
            imgPath +
            '" width="73" height="70">' +
            '           </div>' +
            '            <div class="desc">' +
            '                <div class="ellipsis">' +
            item.address +
            '</div>' +
            '                <div class="jibun ellipsis">' +
            item.description +
            '</div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

          var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
          });

          // Add overlay listener to marker
          kakao.maps.event.addListener(marker, 'mouseover', () => {
            overlay.setMap(map);
          });
          kakao.maps.event.addListener(marker, 'mouseout', () => {
            overlay.setMap(null);
          });
          overlay.setMap(null);
          overlayArr.push(overlay);
        }
      });
    });
    // Add type control
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // Add zoom control
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // Set state
    setMap(map);
    setOverlayArr(overlayArr);
  }, [overlayArr, props.restaurantList], map);


  return <div id="myMap" className={classes.mapStyle} />;
}
