#homeGrown API
####*turning excess into currency*
___
#Overview
---
####Technologies used
* MongoDB
* Mongoose
* Express
* NodeJS
* Angular
* jQuery
* Materialize
* JSON Web Tokens
* Google Geo API
* Google Places API

___

####homeGrown inspiration

I know many people who have trees in their backyards that eventually are so full of fruit, they have no idea what to do with all of it.  

homeGrown will connect people with similar problems and allow them to share and barter their excess goods.  

As of now, homeGrown is just an API, but soon, it will be a full-stack app that with a plethora of features such as: 

* facilitate food-swaps (meetups)
* suggest neutral meetup locations such as parks and cafés
* show available meetups by location 
* show all goods that will be present at each meetup 
* allow users to blog about their meetups
* post pictures from meetups
* post recipes with ingredients from meetups
* allow users to comminicate directly with others attending the same meetup
* allow users to rate other users for peer accountability
* allow users to mark blog posts and messages as "innappropriate" 
* impliment systems for disabling and/or suspending accounts with low ratings
* provide admin rights for developers to maintain the database

___
#The API
___

##Users

#####User Data Model
| Key        | Value                    |
|:-----------|-------------------------:|
| firstName  | String, Required         |
| lastName   | String                   |
| email      | String, Required         |
| password   | String, Required         |
| aboutMe    | String, Max 180 char     |
| profilePic | String                   |
| streetAddr | String                   |
| zipCode    | String, Required         |
| admin      | Boolean, Default = false |
| rating     | Number, Default = 5      |
| goods      | Array, GoodSchema        |

#####GoodSchema
| Key         | Value                      |
|:------------|---------------------------:|
| name        | String, Required           |
| description | String, Max 180 char       |
| isReady     | Boolean, Default = false   |
| quantity    | String, enum = S, M, L, XL |

####User Endpoint Reference 

| HTTP Verb | Endpoint       | Access     |
|:---------:|:--------------:|:----------:|
| POST      | /api/login     |            |
| GET       | /api/users     | token      |
| GET       | /api/users/:id | token      |
| POST      | /api/users     |            |
| PUT       | /api/users/:id | token      |
| DELETE    | /api/users/:id | admin only |

####User JSON Object

A successful `GET` to `api/users/57915c7b5967949b22b43d06` will respond with:

```JSON
[
  {
    "_id": "57915c7b5967949b22b43d06",
    "firstName": "Jacob",
    "email": "jedijake@me.com",
    "aboutMe": "My name is Jacob, and I'm the developer responsible for homeGrown.  I hope you find it helpful when your lemon tree yields more lemons than you know what to do with.",
    "zipCode": "90042",
    "__v": 0,
    "goods": [
      {
        "name": "Apples",
        "description": "Juicy, delicous, apples",
        "_id": "57915c7b5967949b22b43d08",
        "quantity": "M",
        "isReady": true
      },
      {
        "name": "Sourdough Bread",
        "description": "Wholesome and nutritious sourdough bread.",
        "_id": "57915c7b5967949b22b43d07",
        "quantity": "S",
        "isReady": false
      }
    ],
    "rating": 5,
    "admin": true
  }
```

##Meetups
####Meetup Data Model
| Key               | Value                    |
|:------------------|-------------------------:|
| createdBy         | String, User ObjectID    |
| attending         | Array, User ObjectID     |
| time              | Date                     |
| suggestedLocation | String                   |
| actualLocation    | String                   |
| messageBoard      | Array, MessageSchema     |
| isCompleted       | Boolean, Default = false |

####MessageSchema
| Key           | Value                   |
|:--------------|------------------------:|
| createdBy     | String, User ObjectID   |
| content       | String, Max 400 char    |
| isAppropriate | Boolean, Default = true |

####Meetup Endpoint Reference

| HTTP Verb | Endpoint         | Access     |
|:---------:|:----------------:|:----------:|
| GET       | /api/meetups     | token      |
| GET       | /api/meetups/:id | token      |
| POST      | /api/meetups     | token      |
| PUT       | /api/meetups/:id | token      |
| DELETE    | /api/meetups/:id | token      |

####Meetup JSON Object

A successful `GET` to `/api/meetups/5791b9f852be145f330fd526` will respond with:

```json
{
  "meetup": {
    "_id": "5791b9f852be145f330fd526",
    "__v": 0,
    "isCompleted": false,
    "messageBoard": [],
    "attending": [
      null
    ]
  },
  "goods": []
}
```
##Posts (blog)
#### Post Data Model

| Key      | Value                 |
|:---------|----------------------:|
| cretedBy | String, User ObjectID |
| content  | String, Max 500 char  |
| photoUrl | String                |
| likes    | Array, LikeSchema     |

####LikeSchema

| Key     | Value                 |
|:--------|----------------------:|
| isLiked | Boolean               |
| likedBy | String, User ObjectID |

####Post (blog) Endpoint Reference

| HTTP Verb | Endpoint       | Access  |
|:---------:|:--------------:|:-------:|
| GET       | /api/posts     | token   |
| GET       | /api/posts/:id | token   |
| POST      | /api/posts     | token   |
| DELETE    | /api/posts     | token   |

####Post (blog) JSON Object

A successful `GET` to `api/posts/57915d527dc063db22e426fc` will respond with:

```json
[
  {
    "_id": "57915d527dc063db22e426fc",
    "content": "This one time, I went to a meetup...",
    "__v": 0,
    "likes": []
  }
]
```

##My approach

I wanted to build a full-stack app that was very simple and easy to use.  However, once I started building my back-end, I realized that the infrastructure I wanted to implement required a lot of nested data to be generated.  So, by default, I built an API with the intentions of filling in the front-end as an ongoing project when WDI is completed.  

There are a few finishing touches I need to put on my API, but the front end should take me about the same amount of time to complete.  When it is completed, I hope to have an app from which many can benefit and many will use.  

##Hurdles
That sweet, sweet data.  I realized that in order to have the features I wanted the app to have, I had to generate a lot of sweet, sweet data.  

There were also a few hurdles retrieving and manipulating nested data.  For instance, it took a lot of time and energy to make a function that would display User's Goods from within the Meetup model. Eventually, with a ton of help from Ezra, we (he) figured this out....

```javascript
meetupSchema.methods.goods = function(callback) {
  let meetUpUsers = this.attending;
  meetUpUsers.push(this.createdBy);
  mongoose.model('User').find({
    "_id": {$in: meetUpUsers}
  }, function(err, users) {
    if (err) console.log(err);
    let goods = [];
    users.forEach(e => {
      goods.push(...e.goods);
    });
    console.log("GOODS! ", goods);
    console.log("USERS! ", users);
    goods = goods.filter(e => e.isReady);
    callback(err, goods);
  });
};
```

I then called this function from my MeetupsController when sending a `GET` request to show a single meetup. 

##In the IceBox
I would have liked to finished the front end of the app, but at the same time, I want this app to be my keystone project for my portfolio, and I'd like it to be genuinely useable.  I will finish the front end in weeks to come.

[obligatory trello link](https://trello.com/b/IaY9t1vH/homegrown)

###Special Thanks
* Ezra Raez
* PhilCo
* WesCoasPhil
* ~~Jim~~
* WDI DTLA-X