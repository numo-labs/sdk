# API Design

## 2016-08-18 Proposed JS query API

Call a method on the SDK with a query object. Emits `result`, `end` and `error` events.

```javascript
const sdk = require('numo-sdk');
sdk.search({ ... }).on('result', (result) => {
  // a result matching query
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
}).on('error', (e) => {});
```

Call a method on the SDK with an array of labelled queries. Emits `result`, `end` and `error` events as above, but additionally may emit namepsaced `result:<label>` events (and possibly also namespaced `end` events?).

```javascript
const sdk = require('numo-sdk');
sdk.search([
  { label: 'foo', ... },
  { label: 'bar', ... }
]).on('result:foo', (result) => {
  // a result matching the `foo` query
  console.log(result);
}).on('result:bar', (result) => {
  // a result matching the `bar` query
  console.log(result);
}).on('result', (result) => {
  // a result matching any query
  // this event will be fired along with the two events above
  console.log(result);
}).on('end', () => {
  // all results have been emitted, do not expect further results
  console.log('DONE');
});
```

## 2016-08-18 Sketch implementation

When performing a query the SDK will:

* build a fully qualified qury object as per [schema](numo-labs/schema)
* generate a uuid for the search (possibly a uuid per query as above?)
* emit websocket event to the api server to initiate the query
* subscribe to a channel corresponding to the generated uuid to receive results

When complete:

* unsubscribe to websocket event channel
* emit `end` event
