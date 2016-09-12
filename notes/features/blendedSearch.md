# Blended Search

Search for products in the backend using a set search paramers:
* tags
* Passenger Mix
* Departure Date(range)
* Duration
* Departure Airport 
* Board Type
* Entities [Array] with options 'Package','Hotel', 'Tile', 'Flight', 'Filters'


A stream of results will be retuned depending on the requested entity types. 
The following entities might be returned:

``` javascript
{
  type: 'packageOffer',
  id: '10f7c79c-3a64-4c98-a3f5-9aa7549f759a'
}
```
 


