import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({success:false, message: "Unauthorized... Please login to continue"});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false, message: "Error...Invalid Token"});
    }
}

export default authMiddleware;