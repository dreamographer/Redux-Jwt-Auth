import jwt from 'jsonwebtoken';
const token = process.env.JWT_SECRET;
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, `${token}`, {
    expiresIn: "30d",
  }); 

res.cookie("jwt", token, {
 httpOnly: true,
 secure: true, 
 sameSite: 'None',
 maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});


}; 

export default generateToken;