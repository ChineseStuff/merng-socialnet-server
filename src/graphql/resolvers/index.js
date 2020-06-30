const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  //This is amazing pretty cool thing: If we have name of type (Post), we can say this:
  //and use following modifier that apllies these modifications to change any of the fields
  //each time any mutation, query, or subscritpion returns a Post [parent es toda la data del Post]
  Post: {
    likesCount: parent => parent.likes.length,
    commentsCount: parent => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};
