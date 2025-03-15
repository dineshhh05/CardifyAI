import jwt from "jsonwebtoken"

// Generates a jwt token for user auth and sends it through a http only cookies, 
// the token only lives for 7 days
export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds 
        httpOnly: true, // prevents XSS attacks attacks cross-site scripting attacks
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "developement", 
    });

    return token;
}
