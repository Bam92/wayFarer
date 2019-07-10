/*
* Way Farer
* @author Abel Lifaefi Mbula
*/

const trips = [
    {
        id: 1,
        origine: 'Mangobo',
        destination: 'Makiso',
        bus_name: 'AAAA',
        bus_img: '',
        num_seats: 50
    },
    {
        id: 2,
        origine: 'Mangobo',
        destination: 'Tshopo',
        bus_name: 'AAAB',
        bus_img: '',
        num_seats: 30
    },
    {
        id: 3,
        origine: 'Makiso',
        destination: 'Lubunga',
        bus_name: 'AAAC',
        bus_img: '',
        num_seats: 40
    },
    {
        id: 4,
        origine: 'Makiso',
        destination: 'Kabondo',
        bus_name: 'AAAC',
        bus_img: '',
        num_seats: 40
    },
]

// Get all trips
const getAllTrips = () => {
    for (let i = 0; i < trips.length; i += 1) {        
       const trip = `${trips[i].origine} » ${trips[i].destination}`;  

       // Create li elt
       const li = document.createElement('li')
       li.id = `quick-booking${i + 1}`

       if (trips[i].id > 3) li.className = 'trips__all'

       // Create a elt
       const a = document.createElement('a')
       a.href = `trip${trips[i].id}`
       li.appendChild(a)
       
       document.getElementById('list__trips').appendChild(li);
       const textnode = document.createTextNode(trip);
       a.appendChild(textnode);
    }
    //return trip
}

console.log(getAllTrips())

/* 
* Get one trip
* @param trip id
*/
const getTrip = (id) => {
    for (let i = 0; i < trips.length; i += 1) {
        if (trips[i].id === id) return `${trips[i].origine} » ${trips[i].destination}`;      
     }
}

/* ---------- Schedule -------------*/
const time = [
    {
        id: 1,
        id_trip: 1,
        time_go: '6:00',
        time_ar: '07:05'
    },
    {
        id: 2,
        id_trip: 1,
        time_go: '12:45',
        time_ar: '13:15'
    },
]

const getDetail = (id) => {

}

// Return total of trips
document.getElementById('trips__total').innerHTML = trips.length