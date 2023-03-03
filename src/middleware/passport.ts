import passport from "passport";
import { User } from "../schemas/User.model";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import jwt from 'jsonwebtoken';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false);
    } else {
      if (user.password === password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "103664704268-973upodtcmp476rk9mceu1k45e3o372h.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile, "profile");
        let existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        console.log("Creating new user...");
        const newUser = new User({
          google: {
            id: profile.id,
          },
          username: profile.emails[0].value,
          password: null,
        });

        await newUser.save();
        console.log(newUser, "newUser");
        return done(null, newUser);
      } catch (error) {
        return done(null, false);
      }
    }
  )
);

export default passport;
