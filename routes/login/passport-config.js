const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialise(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null || await user.active == false){
            return done(null, false, { message: 'No user found'})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((_id, done) => done(null, getUserById(_id)))
}

module.exports = initialise