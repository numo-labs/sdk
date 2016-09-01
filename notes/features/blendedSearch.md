# Blended Search

Search for products in the backend using a set search paramers:
* tags
* Passenger Mix
* Departure Date(range)
* Duration
* Departure Airport 
* Board Type
* Entities [Array] with options 'Package','Hotel', 'Tile', 'Flight'

```javascript
const sdk = require('numo-sdk');

/**
 * Search for tags, times out by default in 30 sec
 * @param params {
 *  tags [array]
 *  Passenger [array] of Passenger
 *  Departure [object] of Departure
 *  Duration
 *  Departure Airport 
 *  Board Type
 *}
 */

var q = {
  entities : ['package','tile','hotel']
  params : 
}


//Execute the search
sdk.search(params).on();
```

__Lower level call__ 

```javascript
//Executed every time 
sdk.query([]

//Executed ones when the first search is executed (empty string or no search results)
sdk.tags.popularSearch(limit);
```






