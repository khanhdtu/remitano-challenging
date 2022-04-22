import passport from '@server/passport'
import session from './session'

const auth = [session, passport.initialize(), passport.session()]

export default auth
