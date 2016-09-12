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
  description: 'Barut Akra er velegnet til dig, der vil bo pÃ¥ et lÃ¦kkert og moderne hotel tÃ¦t pÃ¥ havet og storbyen. Hotellet indgÃ¥r i hotelkÃ¦den Barut og er af hÃ¸j standard. Her kan du tage et morgendyp i Middelhavet fra klipperne neden for hotellet, fÃ¸r du udforsker Antalyas sevÃ¦rdigheder og butikker. Du kan ogsÃ¥ vÃ¦lge at blive pÃ¥ hotelomrÃ¥det, hvor der tilbydes mange aktiviteter og ogsÃ¥ findes bl.a. indbydende poolomrÃ¥der, et stort og veludstyret motionsrum samt en spaafdeling med et stort udvalg af velgÃ¸rende behandlinger.',
  tags:['reception:concierge_service','reception:luggage_storage','reception:ticket_service','reception:tour_desk','reception:currency_exchange','reception:24-hour_front_desk','general:mini-market_on_site','general:airport_shuttle_(surcharge)','general:shuttle_service_(surcharge)','general:air_conditioning','general:non-smoking_throughout','general:shops_(on_site)','general:wake-up_service','general:hardwood_and_parquet_floors','general:heating','general:car_hire','general:gift_shop','general:safety_deposit_box','general:lift','general:bridal_suite','general:vip_room_facilities','general:family_rooms','general:barber_and_beauty_shop','general:facilities_for_disabled_guests','general:non-smoking_rooms','general:newspapers','general:safety_deposit_box','general:room_service','cleaning:daily_maid_service','cleaning:shoeshine','cleaning:ironing_service','cleaning:dry_cleaning','cleaning:laundry','activities:beachfront','activities:indoor_pool_(all_year)','activities:hammam','activities:bicycle_rental','activities:children's_playground','activities:massage','activities:spa_and_wellness_centre','activities:fitness_centre','activities:sauna','activities:tennis_court','outdoors:outdoor_pool_(all_year)','outdoors:terrace','outdoors:garden','poolAndWellness:pool_bar','poolAndWellness:pool_and_beach_towels','poolAndWellness:infinity_pool']
}
```

``` javascript
{
  type: 'packageOffer',
  id: '10f7c79c-3a64-4c98-a3f5-9aa7549f759a',
  mhid: '45179ch',
  name: 'Barut Akra',
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

 


