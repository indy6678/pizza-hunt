const { Pizza, Comment } = require('../models');

const commentController = {
    // add comment to pizza
    addComment({params, body}, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id}) => {
            console.log(_id)
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$push: {comments: _id}}, // using $push method to add the comment's _id to an array in the specific pizza
                {new: true}
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!'});
            return;
        }
        res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
    },

    // remove comment
    removeComment({params}, res) {
        Comment.findOneAndDelete({ _id: params.commentId})
        .then(deletedComment => {
            if(!deletedComment) {
                return res.status(404).json({ message: 'No comment with this id!'});
            }
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$pull: {comments: params.commentId}}, // removes the appropriate comment from the pizza
                {new: true} // returns the updated data
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({ message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;