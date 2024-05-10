import jwt, { JwtPayload } from 'jsonwebtoken'

 const createToken = (
  jwtPayload: JwtPayload,
  secrete: string,
  options: {
    expiresIn: string
  },
) => {
 return jwt.sign(jwtPayload, secrete, options)
}


 const verifyToken = (token:string, secrete:string )=>{
  return jwt.verify(token, secrete);
      
}

export const jwtHelper = {
  createToken,
  verifyToken
}