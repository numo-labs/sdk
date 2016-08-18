# Tags

Search for tags

```javascript
const sdk = require('numo-sdk');

sdk.tag.search(searchString).on('result', (result) => {
  // a result matching query
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
}).on('error', (e) => {});
```





__Lower level call__ 

Search for the top 10 tags related to "spa" and also provide the 10 most popular tags. 

sdk..query([
    {
        "label":"main",
        "entities":["tag"],
        "query": {
            "tags":["spa"],
            "index":"default",
            "limit":10
        }
    },
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

A first response for the query with the label "main" 

```JSON
{
    "header": {
        "messageId": "afb99815-0004-4530-8581-a4aaffb92904",
        "messageType": "federatedSearch.v1",
        "x-correlationId": "afb99815-0004-4530-8581-a4aaffb92904#main",
        "x-cliendId": "75010105537365102704845373651050168024",
        "x-connectionId": "8t6GMkJAmgkws6qVAGCL"
    },
    "body":{
      "items" : [
        {
            "id": "geo:geonames.2510769",
            "name": "Spain",
            "label": "Spanien",
            "boost": null,
            "active": true
         },
         {
            "id": "geo:geonames.6946451",
            "name": "Spanisches Dorf \"Pueblo Espanol\"",
            "label": "Spanisches Dorf \"Pueblo Espanol\"",
            "boost": null,
            "active": true
         },
         {
            "name": "Spa",
            "tagid": "marketing:term.spa",
            "label": "Spa & Relax",
            "boost": null,
            "active": null
         }
      ] 
    }
}
```
A second response for the query with the label "popular" 

```JSON
{
    "header": {
        "messageId": "afb99815-0004-4530-8581-a4aaffb92904",
        "messageType": "federatedSearch.v1",
        "x-correlationId": "afb99815-0004-4530-8581-a4aaffb92904#popular",
        "x-cliendId": "75010105537365102704845373651050168024",
        "x-connectionId": "8t6GMkJAmgkws6qVAGCL"
    },
    "body":{
      "items" : [
        {
            "id": "marketing:term.shopping",
            "name": "Shopping",
            "label": "Shopping",
            "boost": null,
            "active": true
         },
         {
            "id": "geo:geonames.2648110",
            "name": "London"",
            "label": "London"",
            "boost": null,
            "active": true
         }
      ] 
    }
}
```
