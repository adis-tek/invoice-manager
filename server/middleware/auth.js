
const auth = async (req, res, next) => {
    try {
        console.log("Middleware triggered.");

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth