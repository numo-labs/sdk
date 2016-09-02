# search-sdk

## Usage

The SDK can be used in browser or in node. The interface is the same for each.

In a browser:

```html
<script src="./dist/index.js"></script>
<script>
SDK(/* sdk options */).query({ /* your query params */ }, { /* query options */ })
  .on('result', (result) => {
    console.log('Result received', result);
  })
  .on('end', (result) => {
    console.log('All done!');
  });
</script>
```

In node:

```javascript
const SDK = require('sdk');
SDK(/* sdk options */).query({ /* your query params */ }, { /* query options */ })
  .on('result', (result) => {
    console.log('Result received', result);
  })
  .on('end', (result) => {
    console.log('All done!');
  });
```

## Sandbox

There is a sandbox page available in `./sandbox/index.html` that can be used to run SDK queries from the Developer Console.

### Requirements

You will need a version of the [sdk-backend](https://github.com/numo-labs/sdk-backend) running to use the sandbox.

## Events

### `result`

Triggered when a query result is returned by the backend. Has a result object as an argument.

### `end`

Triggered when all results have been returned, and no further results are expected.

### `timeout`

Triggered after the query has been active for a configured amount of time. No further events will be emitted after a timeout.

## Options

All the options below can be passed to the SDK function on construction and will apply to all queries made with the returned SDK object. Options marked with `*` can also be set on a per query basis by passing a second argument to the query method.

### `url`

'String' - The location of the backend socket server. Default: `localhost:9182`.

### `timeout*`

'Number' - The number of seconds to wait for a query to execute. Default: `30`.

## Query Parameters

It is expected that queries will include an `entities` array, which will be a list of the result types that a query expects to receive in the response. This will be used to map the query to particular providers.

## Development

### Compiling Code

#### SDK

The SDK library uses a simple webpack implementation to compile for a browser environment. To run this:

```shell
npm run build:webpack
```

Alternatively, a file system watcher can be run that will recompile the code on file changes:

```shell
npm run build:webpack:watch
```

#### Primus

The primus client library needs to be compiled from the primus npm module. This should only need to be performed manually if installing a new version of primus from npm. To do this run:

```shell
npm run build:primus
```

Both of these build tasks will be executed as an npm prepublish hook, and so will also run following a top-level `npm install`.

### To Do

* [ ] Implement a plugin architecture to allow extending the SDK API with custom methods.
* [ ] Add a result-flattening method to the query response to support "traditional" callback interface - e.g. `sdk.query({/*...*/}).result((err, results) => {});`

## Design Notes

[Can be found here](./notes)