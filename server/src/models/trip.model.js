import trips from '../db/trips';

const findAllTrips = () => trips;
const findTrip = id => trips.find(x => x.id === id);

export default { findAllTrips, findTrip };
