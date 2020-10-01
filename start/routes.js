'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly();

  Route.post('/auth', 'AuthController.authenticate');
});


Route.group(() => {
  Route.post('/tweet', 'TweetController.tweet')
  Route.get('/tweets/:id', 'TweetController.show')
  Route.post('/tweets/reply/:id', 'TweetController.reply')
  Route.delete('/tweets/destroy/:id', 'TweetController.destroy')
}).middleware(['auth'])
