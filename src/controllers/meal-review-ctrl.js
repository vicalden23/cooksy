var db = require('../models');

exports.createReview = function(mealId, userId, payload) {
  return db.MealReview.create({
    rating: payload.rating,
    review: payload.review,
    mealId: mealId,
    userId: userId
  }).then(function(review) {
    return db.MealReview.findById(review.id, {
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        },
        {
          model: db.Meal,
          as: 'meal'
        }
      ]
    });
  });
};

exports.getUserReviews = function(userId) {
  return db.MealReview.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: db.Meal,
        as: 'meal'
      }
    ]
  });
};

exports.updateReview = function(reviewId, payload) {
  return db.MealReview.findById(reviewId)
    .then(function(review) {
      return review.update(payload);
    })
    .then(function(updatedReview) {
      return db.MealReview.findById(updatedReview.id, {
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: {
              exclude: ['password']
            }
          },
          {
            model: db.Meal,
            as: 'meal'
          }
        ]
      });
    });
};
