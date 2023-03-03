"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const User_model_1 = __importDefault(require("../schemas/User.model"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use("local", new passport_local_1.default(async (username, password, done) => {
    const user = await User_model_1.default.findOne({ email: username });
    if (!user) {
        return done(null, false);
    }
    else {
        if (user.password === password) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
}));
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: "103664704268-973upodtcmp476rk9mceu1k45e3o372h.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        let existingUser = await User_model_1.default.findOne({ "google.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        console.log("Creating new user...");
        const newUser = new User_model_1.default({
            google: {
                id: profile.id,
            },
            email: profile.emails[0].value,
            password: null,
        });
        await newUser.save();
        console.log(newUser, "newUser");
        return done(null, newUser);
    }
    catch (error) {
        return done(null, false);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map