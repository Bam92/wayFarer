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

const findAllByUser = (userId) => {
  const reservation = [];
  booking.map((x) => {
    if (x.user_id === userId)  {
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
    }
  });
  return reservation;
};

const findById = id => booking.find(book => book.id === id);
const checkTrip = trip_id => booking.find(tripBooking => tripBooking.id === trip_id);
const findTrip = id => trip.find(t => t.id === id);

const delBooking = (id) => {
  const bookingIndex = booking.indexOf(findById(id));
  return booking.splice(bookingIndex, 1);
};

const bookNow = (trip, user) => {
  const newBook = {
    id: booking.length + 1,
    trip_id: trip,
    user_id: user,
    created_on: new Date
  };

  booking.push(newBook);

  return newBook;
};

export default { findAll, delBooking, findById, findAllByUser, checkTrip, bookNow, findTrip };
