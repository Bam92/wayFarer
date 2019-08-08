import booking from '../db/booking';

const findAll = () => booking;
const findTrip = id => trips.find(x => x.id === id);
const tripExists = (from, to) => {
  return trips.find(trip => trip.origin === from && trip.destination === to);
};

console.log('test at modal', tripExists('Kisangani', 'Makiso'))
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

export default { findAllTrips, findTrip, addTrip, tripExists };
