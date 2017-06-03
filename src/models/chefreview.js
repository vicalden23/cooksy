'use strict';

module.exports = function(sequelize, DataTypes) {
  var ChefReview = sequelize.define('ChefReview', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        ChefReview.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        });
        ChefReview.belongsTo(models.Chef, {
          foreignKey: 'chefId',
          as: 'chef'
        });
      }
    }
  });

  ChefReview.afterCreate(function(review, options) {
    return sequelize.models.Chef.findById(review.chefId)
      .then(function(chef) {
        return chef.increment('reviewCount');
      })
      .then(function(chef) {
        var rating = (chef.rating * (chef.reviewCount - 1)) + review.rating;
        chef.rating = rating / chef.reviewCount;
        return chef.save();
      });
  });

  ChefReview.beforeDestroy(function(review, options) {
    return sequelize.models.Chef.findById(review.chefId)
      .then(function(chef) {
        return chef.decrement('reviewCount');
      })
      .then(function(chef) {
        var rating = (chef.rating * (chef.reviewCount + 1)) - review.rating;
        // If last review, then review count will be zero. Rating will be 0.
        if (chef.reviewCount === 0) {
          chef.rating = 0;
        } else {
          chef.rating = rating / chef.reviewCount;
        }
        return chef.save();
      });
  });

  ChefReview.afterUpdate(function(review, options) {
    var delta = review.rating - review._previousDataValues.rating;

    return sequelize.models.Chef.findById(review.chefId)
      .then(function(chef) {
        var rating = (chef.rating * chef.reviewCount) + delta;
        chef.rating = rating / chef.reviewCount;
        return chef.save();
      });
  });

  return ChefReview;
};
