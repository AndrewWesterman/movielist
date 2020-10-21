# movielist
Shows a list of movies that a user can add to or edit, written using MEAN stack

### Prereqs

Recent (as of 2020) version of `node` and `angular cli`

### Build

Manually build the client app using `ng build` then run `npm run prod` from the root server folder

### Configuration

Create a `production.json` and `default.json` files under the `./config` dir with the following schema:
``` 
{
  "mongoURI": <your mongo instance uri>
}
```
