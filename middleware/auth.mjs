export default function(req, res, next){
    // get token from header
    let token = req.header('token');

    // check if token exists, if not respond error
    if(!token){
        res.status(401).json({msg: 'No Token, Auth Denied'})
    }

    try {
        // check if valid token, else error
        if(token.length !== 24){
            throw Error('Invalid Token')
        }

        // set user to req
        req.user = token;
        
        next() //go to your route

    } catch (error) {
        console.log(error.message);
        res.status(401).json({msg: 'Invalid Token'})
    }
}