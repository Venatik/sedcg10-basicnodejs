const validateAuthSession = (req, res, next) => {
    if (req.session?.user?.isLoggedIn) {
        console.log(req.session);
        next();
    } else {
        res.status(403).send({ message: "You need to login first." });
    }
}

export default validateAuthSession;