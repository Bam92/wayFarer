import trips from '../db/trips';

const findAllTrips = () => trips;
const findTrip = id => trips.find(x => x.id === Number.isInteger(id));

console.log('c ca ' ,findTrip(4));
export default { findAllTrips, findTrip };
