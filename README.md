# search-sdk

## Usage

```html
<script src="./sdk.js"></script>
<script>
SDK().query({}).on('result', (result) => {
  console.log('Result received', result);
});
</script>
```

## Sandbox

There is a sandbox page available in `./sandbox/index.html` that can be used to run SDK queries from the Developer Console.

### Requirements

You will need a version of the [sdk-backend](https://github.com/numo-labs/sdk-backend) to use the sandbox.

## Design Notes

[Can be found here](./notes)