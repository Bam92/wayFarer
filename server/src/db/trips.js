const trips = [
  {
    id: 1,
    seating_capacity: 40,
    bus_licence_number: 'jckjkbbkvv',
    origin: 'Mangobo',
    destination: 'Kisangani',
    trip_date: new Date(),
    fare: 25.01,
    status: 'active',
  },
  {
    id: 2,
    seating_capacity: 40,
    bus_licence_number: 'jckjkbbkvv',
    origin: 'Mangobo',
    destination: 'Kisangani',
    trip_date: new Date() + 1,
    fare: 41.05,
    status: 'active',
  },
];

export default trips;
