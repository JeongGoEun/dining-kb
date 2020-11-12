import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const { kakao } = window;
const useStyles = makeStyles((theme) => ({
  mapStyle: {
    height: '680px',
  },
}));

const Map = forwardRef((props, ref) => {
  const classes = useStyles();
  const [map, setMap] = useState(Object);
  const [overlayArr, setOverlayArr] = useState([]);

  useEffect(
    () => {
      const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(37.541894, 126.949751),
        level: 3,
      };
      var map = new kakao.maps.Map(container, options);
      props.restaurantList.forEach((item) => {        
        var coords = new kakao.maps.LatLng(item.lng.toString(),item.lat.toString());
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
          item.imgUrl +
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
    },
    [overlayArr, props.restaurantList],
    map,
  );

  useImperativeHandle(ref, () => ({
    setOverlay(index) {
      overlayArr[index].setMap(map);
    },
    unsetOverlay(index) {
      overlayArr[index].setMap(null);
    },
  }));

  return <div id="myMap" className={classes.mapStyle} />;
});

export default Map;
