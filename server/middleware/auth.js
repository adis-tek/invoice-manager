
const auth = async (req, res, next) => {
    try {
        console.log("Middleware triggered.");

        if (req.session.passport?.user) {
            console.log("Current user is => ", req.session.passport?.user);
        } else {
            console.log("No user logged in.");
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth