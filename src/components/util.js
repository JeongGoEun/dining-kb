var save = (key, obj) => window.localStorage.setItem(key, JSON.stringify(obj));
var load = (key) => JSON.parse(window.localStorage.getItem(key));

var getRestaurantsFromLocal = () => load('restaurants');
var setRestaurantsToLocal = (obj) => save('restaurants', obj);

var getRestaurantInfoFromLocal = (id) => load(id);
var setRestaurantInfoToLocal = (id, obj) => save(id, obj);

export {
    getRestaurantsFromLocal,
    setRestaurantsToLocal,
    getRestaurantInfoFromLocal,
    setRestaurantInfoToLocal
}