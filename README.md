# _Doctor Lookup_

#### by _Chan Lee_  10/19/2018

## Description

This program provide list of doctors that provides the services. Users can set the criteria of medical symptom, place nearby and name of the doctor to facilitate this process. Website will retrieve data from Better Doctor API, with some other information including first and last name, address, phone number, website url, whether said doctor is taking new patients, and short Biography.

[Screenshot](/src/img/screenshot.png)

## Specifications

1. Allow users to input and search through doctors by medical issue.

2. Allow users to input and search through doctors by doctor name.

3. The search response will include first and last name, address, phone number, website and whether said doctor is taking new patients.

4. If API call results in an error, this error will be communicated to the user.

5. If there are no doctors matching the search parameters, response will tell the user that no doctors match the criteria.

6. Allow users to search by location.

7. Retrieve the list of specialities from the database before you query for a doctor, then return that list in a dropdown menu.

8. Create a list of "related doctors" and display it.

9. Allow users to browse to previous or next search result page.

## Setup/Installation Requirements

1. Clone this repository
```
    $ git clone https://github.com/goenchan/Doctor-Lookup.git
```
2. Navigate into the directory
```
    $ cd Doctor-Lookup
```
3. Run the following command to install required file
```
    $ npm install
```
4. Run local hosting through below command
```
    $ npm run start
```
5. Connect to http://localhost:8080 in web browser.


## Known Bugs

*None.*


## Support and contact details

_ChanEthanLee@gmail.com_

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery
* Jasmine
* Karma
* Webpack

#### Licensed under MIT

### _Chan Lee_ Copyright (c) 2018
