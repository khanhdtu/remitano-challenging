import { findUserForAuth, findUserWithUsernameAndPassword } from '@server/services/user'
import { IRequest, IUser } from 'interfaces'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.serializeUser((user, done) => {
  done(null, (user as IUser)._id)
})

passport.deserializeUser((req: IRequest, id: string, done: Function) => {
  findUserForAuth(req.db, id).then(
    (user: IUser) => done(null, user),
    (err: Error) => done(err),
  )
})

passport.use(
  new LocalStrategy({ usernameField: 'username', passReqToCallback: true }, async (req, username, password, done) => {
    const user = await findUserWithUsernameAndPassword((req as IRequest).db, {
      username,
      password,
    })
    if (user) done(null, user)
    else done(null, false, { message: 'username or password is incorrect' })
  }),
)

export default passport
