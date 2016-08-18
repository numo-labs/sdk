# Tags

Search for tags

```javascript
const sdk = require('numo-sdk');

/**
 * Search for tags, times out by default in 30 sec
 * @param searchString String used for searching for tags
 * @param limit max items to be returned, default 10
 */

//Execute the search
sdk.tags.search(searchString, limit).on('result', (result) => {
  //results with the label 'main':
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
}).on('error', (e) => {});

//Execute a popular search
sdk.tags.searchPopular(limit).on('result', (result) => {
  //results with the label 'main':
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
}).on('error', (e) => {});
```

__Lower level call__ 

Search for the top 10 tags related to "spa" and also provide the 10 most popular tags. 

```javascript
sdk.query([
  {
      "label":"main",
      "entities":["tag"],
      "query": {
          "tags":["spa"],
          "index":"default",
          "limit":10
      }
  }
]).on('result', (result) => {
  // a result matching query
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
}).on('error', (e) => {});

sdk.query([
  {
      "label":"popular",
      "entities":["tag"],
      "query": {
          "index":"popular",
          "limit":10
      }
  }
]).on('result', (result) => {
  // a result matching query
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
}).on('error', (e) => {});


```

__Sample Response Messages:__


Sample responses: .on('result') 

```JSON
{
  __label: "main",
  "id": "geo:geonames.2510769",
  "name": "Spain",
  "label": "Spanien",
  "boost": null,
  "active": true
}
```

```JSON
{
  __label: "main",
  "id": "geo:geonames.6946451",
  "name": "Spanisches Dorf \"Pueblo Espanol\"",
  "label": "Spanisches Dorf \"Pueblo Espanol\"",
  "boost": null,
  "active": true
}
```

```JSON
{
  __label: "main",
  "name": "Spa",
  "tagid": "marketing:term.spa",
  "label": "Spa & Relax",
  "boost": null,
  "active": null
}
```
A second response for the query with the label "popular" 

```JSON
{
  __label: "popular",
  "id": "marketing:term.shopping",
  "name": "Shopping",
  "label": "Shopping",
  "boost": null,
  "active": true
}
```
```JSON
{
  __label: "popular",
  "id": "geo:geonames.2648110",
  "name": "London"",
  "label": "London"",
  "boost": null,
  "active": true
}
```

