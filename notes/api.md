# API Design

# 2016-09-05

## Current implementation

```javascripts
const sdk = require('sdk');

sdk().query({ ... })
  .on('result', () => {...})
  .on('end', () => {...});
```

See [readme](../README.md) for more details

## Proposals

* [ ] [Provider Query Lambda](#provider-query-lambda)
* [ ] [Chainable Query Methods](#chainable-query-methods)
* [ ] [Subquery Methods](#subquery-methods)

### Provider Query Lambda

Remove the code which iterates over providers in order to ascertain which providers should be invoked for a query from the backened itself. Instead invoke an external lambda function with the query parameters and use the response value.

The advantage of this is that the websocket service will not need to be reconfigured and restarted (potentially with a number of active websocket connections disrupted) in order to add additional provider services.

### Chainable Query Methods

As well as a basic query method, additionally support methods on the oject returned by `sdk().query()` to add further filters/parameters to the query.

Example:

```javascript
const sdk = require('sdk');

sdk().query()
  .limit(10)
  .sort('price', 'asc')
  .fields('hotelName', 'price', 'location')
  .send()
  .on(...);
```

Note the additional `send` function to indicate that the query is complete and can be sent to the server.

Alternatively (or additionally) the query could be automatically sent asynchronously, so if `.send` has not been called explicitly then the query will be sent anyway.

Example:

```javascript
setImmediate(() => {
  if (!query.isSent) {
    query.send();
  }
});
```

It is not clear at this point where in the service stack the resolution of limits and sorting would be applied, so it may be that these aspects are not implemented from day 1. Initial thought is that limiting could be implemented at the websocket layer where we already track the completeness state for each provider in order to emit `end` events, and so maintaining a count would be easy to achieve. In this case, the full query pipeline would continue to execute, there would simply be no further results piped to the client. This model would support [subquery methods](#subquery-methods) as described below.

### Subquery Methods

Once a query has been complete, the results will be saved into an S3 bucket where appropriate (it is not expected that this will be relevant for all entity types).

We can then provide an interface to the client to perform further filtering and indexing on the complete result set. These would be performed by a separate "S3 indexer" provider, which would handle queries where a "parent query" identifier was present on the query parameters. It is expected that other providers would ignore queries with a "parent query id" property.

Examples:

```javascript
const sdk = require('sdk');

const search = sdk().query({
  tags: ['geo:spain'],
  entities: ['hotels', 'packages']
}).send();

search.index('price', 'rating').on('result', () => {
  // provides a breakdown of the number of results within ranges for each of the properties specified
});
search.filter({ price: ['100-200', '200-300'] }).on('result', () => {
  // filters applies a filter to the existing search results, which returns only the results which fit within a set of index groups specified
});
search.sort('price', 'asc').range(0, 20).on('result', () => {
  // sorts the result set and returns the first 20 results
});
```

Note that in this case, the sorting would be performed based on an index of the full result set, so would be easier to implement than the sort decribed above.
