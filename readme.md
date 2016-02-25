Angular Authentication Lab
==========================

Using the API provided that has a User resource and two unprotected routes of `/login` and `/register` - make the Angular front-end so that you can register, login and logout. 

For the purposes of our app, if a user is logged in they should be able to:

- View a list of users
- View a list of projects
- Add a project for a user

The properties of the `User` resource are:

```
javascript
var userSchema = mongoose.Schema({
  local: {
    username: { type: String },
    fullname: { type: String },
    image: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }]
});
```

We've given you the API code, but as we need to get you used to making Angular apps, the front-end folder is blank. You will need to make your Angular app from scratch. Remember that the classwork we've been doing today uses ngResource / $resource.

## Bonus

Use UI-router!

