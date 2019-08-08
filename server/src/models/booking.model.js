import booking from '../db/booking';
import user from '../db/data';
import trip from '../db/trips';

const findAll = () => {
  const reservation = [];
  booking.map((x) => {
    const userInfo = user.find(k => k.id === x.user_id);
    const tripInfo = trip.find(l => l.id === x.trip_id);

    if (tripInfo) {
      x.created_on = tripInfo.trip_date;
      x.bus_licence_number = tripInfo.bus_licence_number;
    }

    if (userInfo) {
      x.first_name = userInfo.first_name;
      x.last_name = userInfo.last_name;
      x.email = userInfo.email;
    }
    reservation.push(x);
  });
  return reservation;
};

const findById = id => booking.find(book => book.id === id);

const delBooking = id => delete findById(id);


/*
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
*/
export default { findAll, delBooking, findById };
