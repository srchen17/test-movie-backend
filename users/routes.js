import * as dao from "./dao.js";

function UserRoutes(app) {
    const createUser = async (req, res) => {
        console.log("IN create user");
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };


    const findAllUsers = async (req, res) => {
        console.log("IN find all users");
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findLatestUsers = async (req, res) => {
        console.log("IN find all users");
        const users = await dao.findLatestUsers();
        res.json(users);
    };

  

    const findUserById = async (req, res) => {
        console.log("IN find user by id");
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const updateUser = async (req, res) => {
        console.log("IN updateuser");
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };
    //sign up, invalid if user name is taken
    const signup = async (req, res) => {
        console.log("IN Signup");
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    // const signin = async (req, res) => {
    //     const { username, password } = req.body;
    //     const currentUser = await dao.findUserByCredentials(username, password);
    //     req.session['currentUser'] = currentUser;
    //     res.json(currentUser);
    // };

    // const signin = async (req, res) => {
    //     try {
    //         const { username, password } = req.body;

    //         // Log incoming sign-in attempt
    //         console.log(`Sign-in attempt for username: ${username}`);

    //         // Perform user authentication (DAO function or logic)
    //         const currentUser = await dao.findUserByCredentials(username, password);
    //         console.log(`CURRENT USER: ${currentUser}`);

    //         // check if the entered user exists in the system and password is correct
    //         if (currentUser == null){
    //             const finduser = await dao.findUserByUsername(username);
    //             if (finduser == null){
    //                 console.error(`username does not exist: ${username}`);
    //                 res.status(400).json(
    //                     { message: "Username does not exist" });
    //                 // res.send("Username does not exist");

    //             }else{
    //                 console.error('password incorrect');
    //                 res.status(400).json(
    //                     { message: "Password incorrect" });
    //                 // res.send("Password incorrect");
    //             }
    //         }else {
    //             // successful sign-in
    //             console.log(`Successful sign-in for username: ${username}`);

    //             console.log("Session before setting currentUser:", req.session);
    //             const currentUser = await dao.findUserByCredentials(username, password);
    //             // Set session or return user data
    //             req.session['currentUser'] = currentUser;
    //             req.session.save();
    //             console.log("Session after setting currentUser:", req.session);
    //             res.json(req.session['currentUser']);
    //         }
    //     } catch (error) {
    //         // Log any errors that occur during sign-in
    //         console.error(`Error during sign-in for username: ${username}`, error);

    //         // Handle the error and send an appropriate response
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        console.log(req.session['currentUser']);
        req.session.save();
        res.json(currentUser);
        console.log("sign in:");
        console.log(JSON.stringify(req.session['currentUser']));
      };


    const account = async (req, res) => {
        console.log(req.session['currentUser']);
        res.json(req.session['currentUser']);
    };
    


    const signout =async (req, res) => {
        console.log("IN Signout");
        req.session.destroy();
        res.json(200);
    };

    const follow = async(req, res) => {
        console.log("IN Follow");
        // adds this user to the other user's follower list
        try{
            const { userId, followerId } = req.body;
            const follow = await dao.addFollower(userId,followerId);
            // adds that user to the this user's following list
            const following = await dao.addFollowing(userId,followerId);
            res.json({follow,following});
        }catch (e) {
            res.status(404).json({ error: 'follower error ' });
        }
  

      
    };

    const findAllFollowersByUserId = async(req, res) => {
        console.log("IN find all followers");
        // const users = await dao.findAllFollowersByUserId(req.params.userId);
        // res.json(users);
        const user = await dao.findUserById(req.params.userId);
        const followers = user.followers;
        res.json(followers);
    }

    const findAllFollowingByUserId = async(req, res) => {
        console.log("IN find all following");
        // const users = await dao.findAllFollowingByUserId(req.params.userId);
        // res.json(users);

        const user = await dao.findUserById(req.params.userId);
        const following = user.following;
        res.json(following);

    }




    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);


    app.get("/api/users/followers/:userId", findAllFollowersByUserId);
    app.get("/api/users/following/:userId", findAllFollowingByUserId);
    app.post("/api/users/follow", follow);
    app.get("/api/users/latest/find", findLatestUsers);
}
export default UserRoutes;