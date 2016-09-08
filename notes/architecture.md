# Architecture

![https://drive.google.com/file/d/0B0zWicBAz_3Wb3NCNnlTSFBLeGM/view?usp=sharing](./sdk-architecture.png)

The current (as of 2016-09-07) architecture of the SDK stack is shown above.

## Notes

* Providers are wrapped inside [numo-sdk-provider](https://github.com/numo-labs/sdk-provider) module to provide a common interface onto event emitting functions, and remove the need for all providers to be independently configured. It would be expected that this module would be extended to provide enhanced functionality for providers, and abstract away any boilerplate or configuation.
* New providers should be registered in the [lambda-sdk-query](https://github.com/numo-labs/lambda-sdk-query/blob/master/index.js#L8-L11) project. It is assumed at this point that providers will all be lambdas, and so can be configured using only the `name` of the lambda, and the entity types to which it responds (as per the existing example).
* The `lambda-search-result-handler` has been *heavily* stripped down from the Nordic version, and will probably want to be separated out into its own repo (or at least renamed) before too long for consistency with "sdk" naming conventions.
* Configuration of event and topic names is passed through from the `sdk-backend` and `lambda-sdk-query` so does not need to be separately configured in providers or downstream lambdas.
* The `lambda-sdk-query` can be swapped out for a different lambda (for example, if developing a new provider) by providing a `lambda` option when configuring the SDK - e.g. `SDK({ lambda: 'my-dev-lambda' }).query({...})`
