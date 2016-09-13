# Blended Search

Search for products in the backend using a set search paramers:

  * tags: a list of tags to create a candidate list
  * Passenger Mix: the party mix going on holiday (opional)
  * Departure Date(range): departure date, default [now, now + 3months] 
  * Duration: duration of the holiday, default 7
  * Departure Airport
  * Board Type
  * includeEntities: which entities do you want in the search (Packages, Hotel Only, Flights, ...
  * streamEntities: which response entities would you like to have e.g. listerItem


sdk().blendedSearch({
  tags: [],
  paxMix: {}
  * Departure Date(range)
  * Duration
  * Departure Airport 
  * Board Type
  * includeEntities: ['Package','Hotel','Tile','Flight']
  * streamEntities: ['oneweb:listerItem:content',''oneweb:listerItem:price', 'oneweb:lister:filterTag']
})

A stream of results will be retuned depending on the requested entity types. 
The following entities might be returned:

_Master hotel entity_

``` javascript
{
  reqId: 'ed6ea808-0d9b-4df5-a824-a8faf75e8358',
  entityType: 'accommodation:master',
  mhid: '45179ch',
  name: 'Barut Akra',
  lon: '36.8639057'
  lat: '30.7237622'
}
```

_Tripadvisor Rating Entity_

``` javascript
{
  reqId: 'ed6ea808-0d9b-4df5-a824-a8faf75e8358',
  entityType: 'rating:tripadvisor',
  mhid: '45179ch',
  rating: 4.6,
}
```

_Hotel yield Entity_

``` javascript
{
  reqId: 'ed6ea808-0d9b-4df5-a824-a8faf75e8358',
  entityType: 'yield:oneweb:family',
  score: '0.1343',
}
```

_Accommodation Content_

``` javascript
{
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
  description: 'Barut Akra er velegnet til dig, der vil bo pÃ¥ et lÃ¦kkert og moderne hotel tÃ¦t pÃ¥ havet og storbyen. Hotellet indgÃ¥r i hotelkÃ¦den Barut og er af hÃ¸j standard. Her kan du tage et morgendyp i Middelhavet fra klipperne neden for hotellet, fÃ¸r du udforsker Antalyas sevÃ¦rdigheder og butikker. Du kan ogsÃ¥ vÃ¦lge at blive pÃ¥ hotelomrÃ¥det, hvor der tilbydes mange aktiviteter og ogsÃ¥ findes bl.a. indbydende poolomrÃ¥der, et stort og veludstyret motionsrum samt en spaafdeling med et stort udvalg af velgÃ¸rende behandlinger.',
  tags:['facility:reception:concierge_service','facility:reception:luggage_storage','facility:reception:ticket_service','facility:reception:tour_desk','facility:reception:currency_exchange','facility:reception:24-hour_front_desk','facility:general:mini-market_on_site','facility:general:airport_shuttle_(surcharge)','facility:general:shuttle_service_(surcharge)','facility:general:air_conditioning','facility:general:non-smoking_throughout','facility:general:shops_(on_site)','facility:general:wake-up_service','facility:general:hardwood_and_parquet_floors','facility:general:heating','facility:general:car_hire','facility:general:gift_shop','facility:general:safety_deposit_box','facility:general:lift','facility:general:bridal_suite','facility:general:vip_room_facilities','facility:general:family_rooms','facility:general:barber_and_beauty_shop','facility:general:facilities_for_disabled_guests','facility:general:non-smoking_rooms','facility:general:newspapers','facility:general:safety_deposit_box','facility:general:room_service','facility:cleaning:daily_maid_service','facility:cleaning:shoeshine','facility:cleaning:ironing_service','facility:cleaning:dry_cleaning','facility:cleaning:laundry','facility:activities:beachfront','facility:activities:indoor_pool_(all_year)','facility:activities:hammam','facility:activities:bicycle_rental','facility:activities:children's_playground','facility:activities:massage','facility:activities:spa_and_wellness_centre','facility:activities:fitness_centre','facility:activities:sauna','facility:activities:tennis_court','facility:outdoors:outdoor_pool_(all_year)','facility:outdoors:terrace','facility:outdoors:garden','facility:poolAndWellness:pool_bar','facility:poolAndWellness:pool_and_beach_towels','facility:poolAndWellness:infinity_pool']
}
```

_Anite Offer_
``` javascript
{
  type: 'packageOffer',
  id: '10f7c79c-3a64-4c98-a3f5-9aa7549f759a',
  mhid: '45179ch',
  name: 'Barut Akra',
  description: '',
  flights: {
    outbound: [
      {
        number: "na",
        departure: {
          localDateTime: "2016-07-02T17:55:00",
          airport: {
            code: "CPH",
            name: "Kastrup Terminal 2"
          }
        },
        arrival: {
          localDateTime: "2016-07-02T22:20:00",
          airport: {
            code: "AYT"
          }
        },
        carrier: {
          code: "DK"
        }
      }
    ],
    inbound: [
      {
        number: "na",
        departure: {
          localDateTime: "2016-07-30T13:30:00",
          airport: {
            code: "AYT",
            name: "Antalya terminal 2"
          }
        },
        arrival: {
          localDateTime: "2016-07-30T16:05:00",
          airport: {
            code: "CPH"
          }
        },
        carrier: {
          code: "DK"
        }
      }
    ]
  },
  price: {
    total: 36298,
    perPerson: 18149,
    currency: "DKK",
    discountPrice: 0
  }
}
```

 


