# Tags

## Index

* [Search for tags](#search-for-tags)
* [Search for popular tags](#search-for-popular-tags)

## Search for tags

```javascript
const sdk = require('numo-sdk');

/**
 * Search for tags, times out by default in 30 sec
 * @param searchString String used for searching for tags
 * @param limit max items to be returned, default 10
 * @param callback 
 */

//Execute the search
sdk.tags.search(searchString, limit, function(err, result){
  
});
```
__Lower level call__ 

Search for the top 10 tags related to "spa"

```javascript
sdk.request(
  {
    "label":"main",
    "entities":["tag"],
    "query": {
        "tags":["spa"],
        "index":"default",
        "limit":10
    }
, callback);
```

__Sample Response Messages:__


Sample responses: .on('result') 

```JSON
[
  {
    __label: "main",
    "id": "geo:geonames.2510769",
    "name": "Spain",
    "label": "Spanien",
    "boost": null,
    "active": true
  },
  {
    __label: "main",
    "id": "geo:geonames.6946451",
    "name": "Spanisches Dorf \"Pueblo Espanol\"",
    "label": "Spanisches Dorf \"Pueblo Espanol\"",
    "boost": null,
    "active": true
  },
  {
    __label: "main",
    "name": "Spa",
    "tagid": "marketing:term.spa",
    "label": "Spa & Relax",
    "boost": null,
    "active": null
  }
]
```

## Search for popular tags


```javascript
const sdk = require('numo-sdk');

/**
 * Search for tags, times out by default in 30 sec
 * @param limit max items to be returned, default 10
 */

//Execute a popular search
sdk.tags.searchPopular(limit, function(err, result){

});
```

__Lower level call__ 

Provide the 10 most popular tags. 

```javascript
sdk.request(
  {
      "label":"popular",
      "entities":["tag"],
      "query": {
          "index":"popular",
          "limit":10
      }
  },
  callback);
```

__Sample Response Messages:__

```JSON
[
  {
    __label: "popular",
    "id": "marketing:term.shopping",
    "name": "Shopping",
    "label": "Shopping",
    "boost": null,
    "active": true
  },
  {
    __label: "popular",
    "id": "geo:geonames.2648110",
    "name": "London"",
    "label": "London"",
    "boost": null,
    "active": true
  }
]
```

