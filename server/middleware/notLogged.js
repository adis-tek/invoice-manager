const auth = async (req, res, next) => {
    try {
        console.log("Not Logged Triggered.");

        if (req.session.passport?.user) {
            console.log("Current user is => ", req.session.passport?.user);
        } else {
            console.log("No user logged in. Redirecting...");
            res.status(301).redirect("https://www.google.com")
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth