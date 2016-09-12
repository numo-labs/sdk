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
  type: 'accommodation',
  mhid: '45179ch',
  name: 'Barut Akra', 
  priorityCode: 179,
  tripadvisorRating: 4.6,
  location: ['Antalya','Tyrkiet','Antalya-omrÃ¥det'],
  images: {
    small: [
      {
        "type": "image/jpeg",
        "uri": "http://images1.spies.dk/images/Hotel/AYTAKRA1048_1_13.jpg?v=14"
      }
    ],
    large: [
      {
        "type": "image/jpeg",
        "uri": "http://images2.spies.dk/images/Hotel/AYTAKRA1048_2_30.jpg"
      },
    ],
  },
  description: 'Barut Akra er velegnet til dig, der vil bo pÃ¥ et lÃ¦kkert og moderne hotel tÃ¦t pÃ¥ havet og storbyen. Hotellet indgÃ¥r i hotelkÃ¦den Barut og er af hÃ¸j standard. Her kan du tage et morgendyp i Middelhavet fra klipperne neden for hotellet, fÃ¸r du udforsker Antalyas sevÃ¦rdigheder og butikker. Du kan ogsÃ¥ vÃ¦lge at blive pÃ¥ hotelomrÃ¥det, hvor der tilbydes mange aktiviteter og ogsÃ¥ findes bl.a. indbydende poolomrÃ¥der, et stort og veludstyret motionsrum samt en spaafdeling med et stort udvalg af velgÃ¸rende behandlinger.'
}
```


{
  type: 'packageOffer',
  id: '10f7c79c-3a64-4c98-a3f5-9aa7549f759a',
  mhid: '45179ch',
  name: 'Barut Akra',
 

  

  
}

 


