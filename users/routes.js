import * as dao from "./dao.js";
let currentUser = null;

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

    const findUserById = async (req, res) => {
        console.log("IN find user by id");
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const updateUser = async (req, res) => {
        console.log("IN updateuser");
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        // const currentUser = await dao.findUserById(userId);
        // req.session['currentUser'] = currentUser;
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
        currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };

    // const signin = async (req, res) => {
    //     const { username, password } = req.body;
    //     const currentUser = await dao.findUserByCredentials(username, password);
    //     req.session['currentUser'] = currentUser;
    //     res.json(currentUser);
    // };

    const signin = async (req, res) => {
        try {
            const { username, password } = req.body;

            // Log incoming sign-in attempt
            console.log(`Sign-in attempt for username: ${username}`);

            // Perform user authentication (DAO function or logic)
            currentUser = await dao.findUserByCredentials(username, password);
            console.log(`CURRENT USER: ${currentUser}`);

            // check if the entered user exists in the system and password is correct
            if (currentUser == null){
                const finduser = await dao.findUserByUsername(username);
                if (finduser == null){
                    console.error(`username does not exist: ${username}`);
                    res.status(400).json(
                        { message: "Username does not exist" });
                    // res.send("Username does not exist");

                }else{
                    console.error('password incorrect');
                    res.status(400).json(
                        { message: "Password incorrect" });
                    // res.send("Password incorrect");
                }
            }else {
                // successful sign-in
                console.log(`Successful sign-in for username: ${username}`);

                console.log("Session before setting currentUser:", req.session);
                // Set session or return user data
                req.session['currentUser'] = currentUser;
                console.log("Session after setting currentUser:", req.session);
                res.json(currentUser);
            }



        } catch (error) {
            // Log any errors that occur during sign-in
            console.error(`Error during sign-in for username: ${username}`, error);

            // Handle the error and send an appropriate response
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const account = async (req, res) => {
        res.json(currentUser);
    };
    


    const signout = (req, res) => {
        console.log("IN Signout");
        currentUser = null;
        res.json(200);
    };





    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
}
export default UserRoutes;