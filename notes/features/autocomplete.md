# Autocomplete feature 

Implements an autocomplete feature for searching for tags using a given string. 

```javascript
const sdk = require('numo-sdk');

/**
 * Search for tags, times out by default in 30 sec
 * @param searchString String used for searching for tags
 * @param limit max items to be returned, default 10
 * @param callback 
 */

//Execute the search
sdk.autocomplete(searchString, limit, function(err, result){});
```

__Lower level call__ 

```javascript
//Executed every time 
sdk.tags.search(searchString, limit);

//Executed ones when the first search is executed (empty string or no search results)
sdk.tags.popularSearch(limit);
```






