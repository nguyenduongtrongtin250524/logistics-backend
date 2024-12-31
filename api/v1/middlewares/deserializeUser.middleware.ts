import { NextFunction, Response } from "express";

import jwtUtil from "../../../utils/jwt.util";

const response401 = (res: Response) => {
  return res.status(401).json({
    status: false,
    message: "Authentification denied."
  });
}

const deserializaUser = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    
    if (!authorization) return response401(res);

    const token = authorization.split(' ');
    if (token[0] !== "Bearer" || !token[1]) return response401(res);

    const accessToken = token[1];
    const verify = jwtUtil.verify(accessToken);
    if (!verify.success) {
      if (!verify.expires) return response401(res);

      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return response401(res);

      const verifyRefreshToken = jwtUtil.verify(refreshToken);
      if (!verifyRefreshToken.success) {
        res.clearCookie("refreshToken");
        return response401(res);
      }

      return res.status(401).json({
        status: false,
        message: "Access token was expires."
      });
    }

    req.user = verify.user;
    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    })
  }
}

export default deserializaUser;