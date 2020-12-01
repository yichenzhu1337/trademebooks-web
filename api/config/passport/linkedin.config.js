const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

const config = require('../../config')

const linkedinStrategyConfig = {
  clientID: config.LINKEDIN.clientID,
  clientSecret: config.LINKEDIN.clientSecret,
  callbackURL: '/api/v1/passport/auth/linkedin/callback',
  proxy: true
}

const linkedinStrategyLogin = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(JSON.stringify(profile, null, '\t'))
  user = { ...profile }
  return cb(null, profile)
}

const linkedinStrategy = new LinkedInStrategy(
  linkedinStrategyConfig,
  linkedinStrategyLogin
)

passport.use(linkedinStrategy)
