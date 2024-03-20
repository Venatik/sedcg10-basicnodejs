const canDeleteOrUpdateProduct = (req, res, next) => {
    const userRole = req.user && req.user.role;

    // Check if the user is admin
    if (userRole === "admin") {
        // User is admin, proceed to the next middleware
        next();
    } else {
        // User is not authorized to perform this action, send 403 status
        res.status(403).send({ message: "You are not authorized to perform this action" });
    }
};

export default canDeleteOrUpdateProduct;