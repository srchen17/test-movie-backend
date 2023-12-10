import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findLatestUsers = () => model.find().sort({_id:1}).limit(10);


// followers


export const addFollower = (userId, followerId) =>
    model.updateOne( { _id: followerId },
        { $addToSet: { followers: userId } });

//aka following id in this case
export const addFollowing = (userId, followerId) =>
    model.updateOne( { _id: userId },
        { $addToSet: { following: followerId } });


 export const findAllFollowersByUserId = (userId) =>
     model.findById(userId);

 export const findAllFollowingByUserId = (userId) =>
    model.find({ user_id: { $in: this.following } });

// export const findFollowerById = (userId) => model.findById(userId);


