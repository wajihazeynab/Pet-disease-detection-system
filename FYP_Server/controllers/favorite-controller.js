const Favorite = require('../models/favorite')

async function addFavorite(req, res) {
    const { authUser } = req;

    const { vet } = req.body;
    let fav;
    try {
        fav = new Favorite({ owner: authUser._id, vet: vet });
        await fav.save();
    } catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }
    return res.status(200).json(fav);
}

async function getFavorite(req, res) {
    const { authUser } = req;

    let fav;
    try {
        // fav = await Favorite.find({ owner: authUser._id,loo });
        fav = await Favorite.aggregate([
            {
                $lookup: {
                    from: 'vets',
                    localField: 'vet',
                    foreignField: '_id',
                    as: 'VetData'
                }
            }
        ])
        let arr = fav.filter(e => e.owner == authUser._id)
        return res.status(200).json(arr);
    }
    catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }

}

async function deleteFav(req, res,) {
    const favId = req.params.id;
    let fav;

    try {
        fav = await Favorite.findByIdAndDelete(favId);
        if (!fav) {
            // const error = HttpError.notFound("Pet not found");
            return res.status(400).json("Favorite not found")
        }
    } catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }
    return res.status(200).json("Favorite Deleted");
}

module.exports = { addFavorite, getFavorite, deleteFav }