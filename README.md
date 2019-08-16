# Way Farer
[![Build Status](https://travis-ci.com/Bam92/wayFarer.svg?branch=develop)](https://travis-ci.com/Bam92/wayFarer)
[![Coverage Status](https://coveralls.io/repos/github/Bam92/wayFarer/badge.png?branch=develop)](https://coveralls.io/github/Bam92/wayFarer?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8b1822f148d1ea914930/maintainability)](https://codeclimate.com/github/Bam92/wayFarer/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

a quick and easy public bus transportation booking service in [Kisangani](https://fr.wikipedia.org/wiki/Kisangani) city, DRCongo.

* UI template: https://bam92.github.io/wayFarer/UI/
* API: https://way-farer-andela.herokuapp.com/
* docs: https://way-farer-andela.herokuapp.com/docs/
* Pivotal Tracker: https://www.pivotaltracker.com/n/projects/2361805

# Get Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
Here are the environment prerequisites for the web app
```
- NodeJS
```
## Installing
Clone the repository
Run ```npm install``` to install ```node``` packages
Run ```npm start``` to start the web app

# Run the tests
## Endpoints
Make sure you have Postman or other tool that can handle http request. Please refer to the docs for more explanation.

| Endpoint | Method | Functionality |
| ---------| -------| --------------|
| /api/v1/auth/signin | POST | Login registered user |
| /api/v1/auth/signup | POST | Register a new User |
| /api/v1/trips | POST | Create a trip |
| /api/v1/trips/`<:trip-id>` | GET | Get a specific trip |
| /api/v1/trips | GET | Get all trips |
| /api/v1/trips/`<:trip-id>`/cancel | PATCH | Change the status of a trip to `cancelled` |
| /api/v1/bookings | POST | Book a seat on a trip |
| /api/v1/bookings | GET | View all bookings. An Admin can see all bookings, while user can see all of his/her bookings |
| /api/v1/bookings/```<:booking-id>``` | DELETE | Delete a booking |

# Built with
* HTML
* CSS
* Javascript
* NodeJS / Express

# Versioning
We use [SemVer](http://semver.org/) for versioning.

# Author
**Abel L Mbula**
 * [https://twitter.com/abelmbula](https://twitter.com/abelmbula)


# Copyright and license
Code and documentation copyright 2019 Abel and Andela. Code released under the [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

# Acknowledgments
* All team mates and bootcampers for cycle 9
