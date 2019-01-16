const db = require("../models");

module.exports = {
    //method for creating new users
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //method for finding user and populating media, recommendations, and friends
    findUser: function (req, res) {
        db.User
            .findById({ _id: req.user._id })
            .populate("media")
            .populate("recommendations")
            .populate("friends")
            .then(function (user) {
                res.json(user)

            })
            .catch(err => res.status(422).json(err));
    },

    // this route is intended for finding users for potential friending purposes
    // returns the userId which can and should be supplied as the SECOND ID in the participatants object sent to newFriendRequest
    // via .get on /api/user/friend
    userByName: function (req, res) {
        console.log(req.body);
        let queryArr = req.body.query.split(" ");
        if (queryArr.length === 1) {
            let queryItem = queryArr[0];
            console.log(queryArr, queryItem)
            db.User.find({$or: [{username: queryItem}, {firstName: queryItem}, {lastName: queryItem}]})
                .then(users => res.json(users))
                .catch(err => res.status(422).json(err));
        } else if (queryArr.length == 2) {
            db.User.find({ $or: [{ username: queryArr.join(" ") }, { $and: [{ firstName: queryArr[0] }, { lastName: queryArr[1] }] }] })
                .then(userArr => res.json(userArr))
                .catch(err => res.status(422).json(err))
        } else if (queryArr.length == 3) {
            db.User.find({ $or: [{ username: queryArr.join(" ") }, { $and: [{ firstName: queryArr[0] }, { lastName: queryArr[2] }] }] })
                .then(userArr => res.json(userArr))
                .catch(err => res.status(422).json(err))
        } else {
            db.User.find({username: queryArr.join(" ")})
            .then(userArr => res.json(userArr))
            .catch(err => res.status(422).json(err))
        }

    },

    // newFriendRequest accepts an array of id's as participants!  
    // The first Id should be the logged in user, the second Id should be the target of the request
    // accessed via .post on /api/user/friend
    newFriendRequest: function (req, res) {
        let participants = [req.user._id, req.body.requestTo];
        let requestTo = req.body.requestTo;
        db.Friends.findOne({ participants: participants }).then(result => {
            if (!result) {
                db.Friends.create({
                    participants: participants,
                    requestTo: requestTo
                }).then(newResult => {
                    res.json({ message: "Friend Request Created" })
                }).catch(err => res.status(422).json(err));
            } else {
                res.json({ message: "Hey, this person all ready got a friend request from you!" })
            }
        }
        ).catch(err => res.status(422).json(err))

    },

    // handling the friend request:  This guy takes strings 'accepted' or 'rejected' as req.body.status.  A green and red button would work fine.
    // accessed via the .put on api/user/friend
    handleFriendRequest: function (req, res) {
        db.Friends.findOneAndUpdate({ 'requestTo': req.user._id }, { $set: { 'status': req.body.status } }, { new: true })
            .then(friendReq => {
                // if the requestTo participant accepts the request
                if (friendReq.status === 'accepted') {
                    let friendArr = friendReq.participants
                    // find the accepting user A.K.A requestTo on our model
                    db.User.findById(req.user._id)
                        .then(result => {
                            // update the friends array on the User model with new friend's A.K.A initiating User's ID
                            result.friends.push(friendArr[0]);
                            result.save(console.log('saved the requestTo friends array'));
                        })
                        .catch(err => console.log(err));
                    // find the initiating User
                    db.User.findById(friendArr[0])
                        .then(result => {
                            // update the initiating User's friends array with our requestTo dudeski
                            result.friends.push(friendArr[1]);
                            result.save(console.log("saved the initiator's friends array"))
                        })
                        .catch(err => console.log(err))
                    res.json({ message: friendArr[0] + " and " + friendArr[1] + " are now friends." })
                } else {
                    res.json({ message: friendArr[0] + " and " + friendArr[1] + " are definitely not friends." })
                }
            })
            .catch(err => res.status(422).json(err));
    },

    pendingRequest: function (req, res) {
        db.Friends.find({ requestTo: req.user._id, status: 'pending' })
            .then(results => {
                if (results) {
                    res.json(results)
                } else {
                    res.json({ message: 'No pending friend requests' })
                }
            })
            .catch(err => res.status(422).json(err))
    },

    getFeed: function (req, res) {
        db.User
            .findById({ _id: req.user._id })
            .populate("friends")
            .populate("media")
            .populate("posts")
            .then(function (dbUser) {
                res.json(dbUser)
            })
    }

    // todo: add in a delete friend request route in case of accidental rejections.


}