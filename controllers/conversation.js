var async = require('async');
var Conversation = require('../models/Conversation');
var User = require('../models/User');

/**
 * GET /conversations
 * Conversations page.
 */
exports.index = function(req, res, next) {
  Conversation.findOne({ users: { $in: [req.user._id] } }, function(err, conversation) {
    if (err) return next(err);
    res.render('conversation', {
      title: 'Conversations',
      conversations: []
    });
  });
};

/**
 * GET /conversations/:id
 * Conversation page.
 */
exports.get = function(req, res, next) {
  User.findById(req.params.id, function(err, partner) {
    if (err) return next(err);

    if (!partner) {
      return res.redirect('/conversations');
    }

    var doc = { users: [req.user._id, req.params.id] };
    Conversation.update(doc, { $set: doc }, { upsert: true }, function(err, conversation) {
      if (err) return next(err);

      Conversation.getForUser(req.user._id, function(err, conversations) {
        if (err) return next(err);

        res.render('conversation', {
          title: partner.profile.name,
          conversations: conversations,
          partner: partner
        });
      });
    });
  });
};

exports.eventHandlers = {
  'search:people': function(query, callback) {
    User.textSearch(query, function(err, output) {
      if (err) return console.error(err);

      callback(output.results.map(function(result) {
        return {
          _id: result.obj._id,
          profile: {
            name: result.obj.profile.name,
            picture: result.obj.profile.picture || User.generateGravatar(60, result.obj.email)
          }
        };
      }));
    });
  },

  'conversations:get': function(partnerId, callback) {
    Conversation.findOne({ users: [this.socket.request.user._id, partnerId] }, function(err, conversation) {
      if (err) return console.error(err);
      callback(conversation.messages.sort(function(a, b) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }));
    });
  },

  'conversations:send': function(data, callback) {
    var msg = {
      sender: this.socket.request.user._id,
      receiver: data.id,
      body: data.body
    };

    var self = this;

    Conversation.update({ users: [this.socket.request.user._id, data.id] }, { $push: { messages: msg } }, function(err) {
      if (err) return console.error(err);

      Conversation.findOne({ users: [self.socket.request.user._id, data.id] }, function(err, conversation) {
        console.log('post-update', conversation);
        if (conversation.messages && conversation.messages.length) {
          callback(conversation.messages[conversation.messages.length - 1]);
        }
      });
    });

    this.filterSocketsByUser(function(user) {
      return user._id == data.id;
    }).forEach(function(socket) {
      socket.emit('conversations:msg', msg);
    });
  }
};
