const jwt = require("jsonwebtoken");
const HttpError = require("./http-error");

const generateAuthToken = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30m",
    }
  );

  return { accessToken, refreshToken };
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

const verifyAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const { authorization } = req.headers;

    if (!authorization) {
      // const error = HttpError.unauthorized("UnAuthorized Access");

      return res.status(402).json("UnAuthorized Access")
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // const error = HttpError.unauthorized("Access Token Expired");
        return res.status(402).json("Access Token Expired")
      } else {
        req.authUser = decodedToken;
      }
    });

    next();
  }
  catch (err) {
    return res.status(402).json("UnAuthorized Access")
  }
};

module.exports = {
  generateAuthToken,
  verifyAuth,
};
