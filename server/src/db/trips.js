const trips = [
  {
    id: 1,
    seating_capacity: 40,
    bus_licence_number: 'RAB12AK',
    origin: 'Mangobo',
    destination: 'Kisangani',
    trip_date: Date.now(),
    fare: 25.01,
    status: 'active',
  },
  {
    id: 2,
    seating_capacity: 40,
    bus_licence_number: 'R5B12AK',
    origin: 'Mangobo',
    destination: 'Kisangani',
    trip_date: Date.now() + 1,
    fare: 41.05,
    status: 'active',
  },
];

export default trips;
