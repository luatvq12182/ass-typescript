const { verify, decode } = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const { authorization } = req.headers;

    if (req.method === 'GET' && !authorization) {
        next();
        return;
    } else {
        if (!authorization) {
            res.status(401).jsonp('Missing authorization header');
            return;
        }

        const [scheme, token] = authorization.split(' ');

        if (scheme !== 'Bearer') {
            res.status(401).jsonp('Incorrect authorization scheme');
            return;
        }

        if (!token) {
            res.status(401).jsonp('Missing token');
            return;
        }

        try {
            verify(token, 'json-server-auth-123456');

            req.claims = decode(token);
            next();
        } catch (err) {
            res.status(401).jsonp(err.message);
        }
    }
};

module.exports = {
    authentication,
};
