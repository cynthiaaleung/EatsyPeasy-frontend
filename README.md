# EatsyPeasy
A single page application to help you and your friends choose where to eat! Answer 3 simple questions to generate a customized selection of restaurants, and have the option to send a poll to your friends as well!

## Dependencies & Tech Stack
* Ruby 2.6.6
* Rails 4.2.11 [Rails Guide](http://guides.rubyonrails.org/v4.2/)
* PostgreSQL 14.1
* React 17.0.2
* React DOM 17.0.2
* React Router
* Google Places API
* [thingproxy](https://github.com/Freeboard/thingproxy) - for quick, initial Google API testing
* Axios
* Chart.js
* Clipboard.js
* Material UI

## Full Application Development (self-hosted)

Default port settings:
⋅⋅* Front-end: `http://localhost:3001`
⋅⋅* Back-end: `http://localhost:3000`

### Pre-Installation
Before working on EatsyPeasy locally, you must get an [API key from Google Places API.](https://developers.google.com/maps/documentation/places/web-service/get-api-key)

### Installation Part 1: Frontend

1. Clone the repository to your local device, change directory into root and then "frontend", then install dependencies.
```
git clone git@github.com:faezcat/EatsyPeasy.git
cd EatsyPeasy
cd frontend
npm i
```
2. In the frontend directory, create a .env file by copying the .env.example file in the frontend directory of the project. Add the API key from Google Places API.
```
cp .env.example .env
```
Opening up the .env file, replace "your-key-here" with the Google Places API key.
```
REACT_APP_GOOGLE_PLACES_API_KEY=your-key-here
```
3. Optional: By default, the frontend is set to `http://localhost:3001`. To change the port, in `package.json`, change the port number where it says `3001`:
```
  "scripts": {
    "start": "PORT=3001 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
### Installation Part 2: Backend
1. Change directory to the "backend" and install dependencies:
```
cd /EatsyPeasy
cd backend
bundle install
```
2. Get the database set-up, starting by logging into `psql`, creating the database and then verifying that it was created:
```
psql
create database eatsypeasy;
\c eatsypeasy
\dt
```
For the back-end, migrate the tables and schema:
```
bin/rake db:reset
bin/rake db:migrate
```
To verify that the schema has been migrated to the database, run an SQL command. Note that the table will be empty, but you should see the column names:
```
psql eatsypeasy
select * from users;
```
2. Optional: If you changed the front-end port in "Installation Part 1: Frontend" - Step 3, this step will apply. To avoid CORS issues, the back-end is using 'rack-cors' middleware for connection to frontend `http://localhost:3001`. To change the frontend port configuration, in config > initializers > `cors.rb`, change the port number where it says `3001`:
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3001'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
3. Optional: By default, the backend is set to `http://localhost:3000`. If using a different back-end port, the API get/post requests in the front-end will need to be updated. This can be done by searching `http://localhost:3000` and replacing the port with your new back-end port number.

## Starting your Servers:

### On front-end:
```
npm start
```
Go to localhost:3001 to view the app.

### On back-end:
```
rails s
```

<h5 align="center">
EatsyPeasy landing page and 3 questions to display customized restaurant results:
</h5>

<div align="center">
<img src="https://media.giphy.com/media/e3NJKSovarIin9AxgG/giphy.gif">
</div>

<h5 align="center">
Get customized results, generate a poll, and share a unique link with friends:
</h5>

<div align="center">
<img src="https://media.giphy.com/media/yh7wWGrqEgTvuMLerL/giphy.gif">
</div>

<h5 align="center">
Vote for your favorite restaurant using the unique link and view the leading option's information:
</h5>

<div align="center">
<img src="https://media.giphy.com/media/6RcfzC5Y9I7sGAd1Tk/giphy.gif">
</div>