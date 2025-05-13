export default function (req, res, next) {
    let token = req.header('token');

    if (!token) {
        res.status(401).json({ message: 'No token. Authorization denied.'});
    }

    try {
        if(token.length !== 24) {
            throw Error('Invalid token')
        }
        
        req.user = token;

        next()

    } catch (err) {
        console.log(error.message)
        res.status(401).json({ message: 'Token is invalid' });
    }
}