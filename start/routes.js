'use strict'

const Route = use('Route')

// Area publica
Route.post('/signup', 'UserController.signup');
Route.post('/login', 'UserController.login');

// Account
Route.group(() => {
  Route.get('/me', 'UserController.me')
  Route.put('/update_profile', 'UserController.updateProfile')
  Route.put('/change_password', 'UserController.changePassword')
})
  .prefix('account')
  .middleware(['auth'])

// Timeline
Route.group(() => {
  Route.get('/timeline', 'UserController.timeline')
  Route.get('/users_to_follow', 'UserController.usersToFollow')
  Route.post('/follow', 'UserController.follow')
  Route.delete('/unfollow/:id', 'UserController.unFollow')
})
  .prefix('users')
  .middleware(['auth']);

// Tweet actions
Route.group(() => {
  Route.post('/tweet', 'TweetController.tweet')
  Route.get('/tweets/:id', 'TweetController.show')
  Route.post('/tweets/reply/:id', 'TweetController.reply')
  Route.delete('/tweets/destroy/:id', 'TweetController.destroy')
}).middleware(['auth'])

// tweet reactions
Route.group(() => {
  // favorite tweet
  Route.post('/create', 'FavoriteController.favorite')
  // unfavorite tweet
  Route.delete('/destroy/:id', 'FavoriteController.unFavorite')
})
  .prefix('favorites')
  .middleware(['auth'])

// User profile
Route.get(':username', 'UserController.showProfile')
