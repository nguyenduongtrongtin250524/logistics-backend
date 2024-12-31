import { IUserFull } from "../api/v1/interfaces/user.interface";

const jwt = require('jsonwebtoken');

interface IVerify {
  success: boolean;
  expires: boolean;
  user: Pick<IUserFull, "code">
};

const generate = (user: Pick<IUserFull, "code">, expiresIn: string) => {
  return jwt.sign(user, process.env.TOKEN, { expiresIn });
};

const verify = (token: string) => {
  const verify: IVerify = {
    success: false,
    expires: false,
    user: { code: "" }
  };

  jwt.verify(token, process.env.TOKEN, (e: Error, user: Pick<IUserFull, "code">) => {
    if (e) {
      if (e.name === "TokenExpiredError") {
        verify.expires = true;
      }
    } else {
      verify.success = true;
      verify.user = user;
    }
  });

  return verify;
}

const jwtUtil = {
  generate,
  verify
};
export default jwtUtil;
