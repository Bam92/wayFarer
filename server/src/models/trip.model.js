import trips from '../db/trips';

const findAllTrips = () => trips;
const findTrip = id => trips.find(x => x.id === id);
const addTrip = (capacity, origin, destination, date, fare) => {
  const newTrip = {
    trip_id: trips.length + 1,
    seating_capacity: capacity,
    origin,
    destination,
    trip_date: date,
    fare,
    status: 'active',
  };

  trips.push(newTrip);
  return newTrip;
};

export default { findAllTrips, findTrip, addTrip };
