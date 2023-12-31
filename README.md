# Moovy

Backend in NestJs, Postgres/Docker. Using Open Movie Database free tier API key.

[Figma](https://www.figma.com/file/byH2CT5gkq5mKMEXtaAcDE/Dev-Challenge-2021%2F1?type=design&node-id=78-62)

## Basic things to do

- User Authentication, enviroment variables and protected routes (jwt authentication).

- Search movies

- MovieList
- Save watched movies
- Delete watched movies
- Every movie has an unique identifier: "imdbID"

- Audios -> (MovieList extention)
- User sends audio file review of watched movie (upload, retrieve all from user and delete audio)

- Add and remove movies from personal library
- Listen to audio review
- Filter movies that user registered an review
- Filter movies pending a review

## Instructions on how to use

Start npm as developer env.

```
npm run start:dev
```

Get postgres database up 'n running.

```
docker-compose up
```

Docker gets two services going: postgres and adminer. 

Adminer is a local web based database visualization tool running on:

```
http://localhost:8080
```

Postgres itself is running on:

```
http://localhost:5432
```

With default credentials. Default password used for testing is "123ronaldo".

## API Routes

```

### User Managment
# ---------------------------------------

> POST /users/create_user
# Create new user and get jwt token

> POST /auth/login
# Login (get jwt token)

> GET /auth/profile
# Get that user's profile

### User Movie List managment
User needs to be authenticated to perform all of this operations
# ---------------------------------------

> POST /omdb/retrieve_movies_from_current_user
# Uses jwt token to retrieve all movies of authenticated user
# (empty request body)

> POST /omdb/delete_movie_from_list
# Uses jwt token to check user, and deletes a movie
# on that user's movie list given ImdbId

> POST /omdb/add_movie_to_list
# Uses jwt token to check user,
# and adds movie (ImdbId, movie name, poster) to MovieList (with username and userId)
# save-movie.dto.ts

> GET /omdb/search_movies/:name
# Retrieve movies from OMDB
# Used for searching movies

> POST /omdb/search_list/:name
# Retrieve movies from user list
# Used for searching movies in user's list

### Audio reviews managment 
User needs to be authenticated to perform all of this operations
# ---------------------------------------

> POST /upload/:imdbID
# Upload new audio

> GET /upload/retrieve/:imdbID
# Get one audio about one given movie

> GET /upload/retrieveAll
# Get all audios that belong to an user

> POST /upload/deleteAudio/:imdbID
# Delete one of user's audios

> GET /upload/retrieveMoviesReviewed
# list of movies reviewed
# Gives back a list of movies!

> GET /upload/retrieveMoviesNotReviewed
# list of movies that still need a review
# Gives back a list of movies!

```