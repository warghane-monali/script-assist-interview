const router = require("express").Router();
const userModel = require("../Modals/AuthModal");
const userController = require("../Controllers/AuthController");
const bcrypt = require("bcryptjs");
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: "userName", passReqToCallback: true }, async (req, userName, password, done) => {

    try {

        let user = await userModel.findOne({ userName });

        if (!user) {

            return done(null, false, { message: "Unauthorized User" });

        }
        else {

            let passwordCheck = await bcrypt.compare(password, user.password);

            if (passwordCheck) {

                let userData = await userModel.findOne(
                    {
                        userName
                    }
                ).select({ password: 0 });

                return done(null, userData, {
                    message: "Login Successful"
                });

            }
            else {

                return done(null, false, { message: "Wrong Password" });

            }

        }

    } catch (error) {

        console.log(error);

        return error;

    }

}));

router.post("/login", async (req, res, next) => {

    passport.authenticate("local", async function (err, user, info) {

        if (err) {

            console.log(err);

            let responses = {
                errors: err.message,
                status: 500,
                data: null
            };

            return res.status(200).json(responses);

        }
        else if (info.message === "Unauthorized User") {

            let responses = {
                data: null,
                message: "No user found",
                status: 404,
                errors: null
            }

            return res.status(200).json(responses);

        }
        else if (info.message === "Wrong Password") {

            let responses = {
                data: null,
                message: "Wrong Password",
                status: 400,
                errors: null
            };

            return res.status(200).json(responses);

        }
        else {

            let responses = {
                data: user,
                message: "Login Successful",
                status: 200,
                errors: null
            }

            return res.status(200).json(responses);

        }

    })(req, res, next);

});

router.post("/registerUser", userController.registerUser);
router.post("/getAllUsers", userController.getAllUsers);
router.post("/getUserByID", userController.getUserByID)

module.exports = router;