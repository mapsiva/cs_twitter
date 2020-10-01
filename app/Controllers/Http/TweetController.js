'use strict'
const Tweet = use('App/Models/Tweet')
const Reply = use('App/Models/Reply')
class TweetController {
  async tweet({ auth, request, response }) {
    const user = auth.current.user;

    const tweet = await Tweet.create({
      user_id: user.id,
      tweet: request.input('tweet')
    });

    await tweet.loadMany(['user', 'replies', 'favorites']);

    return response.json({
      status: 'success',
      message: 'Tweet postado!',
      data: tweet
    });
  }

  async show({ params, response }) {
    try {
      const tweet = await Tweet.query()
        .where('id', params.id)
        .with('user')
        .with('replies')
        .with('replies.user')
        .with('favorites')
        .firstOrFail()

      return response.json({
        status: 'success',
        data: tweet
      });
    } catch (error) {
      return response.json({
        status: 'error',
        message: 'Tweet not found!'
      });
    }
  }

  async reply({ request, auth, params, response }) {
    const user = auth.current.user;
    const tweet = await Tweet.find(params.id);

    const reply = await Reply.create({
      user_id: user.id,
      tweet_id: tweet.id,
      reply: request.input('reply')
    });

    await reply.load('user')

    return response.json({
      status: 'success',
      message: 'Reply posted!',
      data: reply
    });
  }

  async destroy({ auth, params, response }) {
    const user = auth.current.user;

    const tweet = await Tweet.query()
      .where('user_id', user.id)
      .where('id', params.id)
      .firstOrFail()

    await tweet.delete()

    return response.json({
      status: "success",
      message: "Tweet removido!"
    });
  }
}

module.exports = TweetController
