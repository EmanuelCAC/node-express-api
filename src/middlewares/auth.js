import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({
    error: "Usuário não autenticado",
    code: "token-not-found"
  })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        msg: err.message
      })
    }
    req.userLogged = { id: decoded.id, name: decoded.name, avatar: decoded.avatar }
  })

  console.log(req.userLogged);

  next()
}

export default auth