import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//Compare passwords using bcrypt
export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

// Hash password using bcrypt
export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

// Create JWT (JSON Web Token)
export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id, 
        username: user.username
    }, 
    process.env.JWT_SECRET
    )
    return token
}

// Protect a route with JWT authentication
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
}