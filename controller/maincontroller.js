const user = require('../model/user')
const genre = require('../model/genre')
const movie = require('../model/movie')
const series = require('../model/series')
const episode = require('../model/episode')
const subscription = require('../model/subscription')
const payment = require('../model/payment')
const watchHistory = require('../model/watchHistory')
const review = require('../model/review')


exports.getalldata = async (req, res) => {
    try {
        const page = (req.query.page) || 1;
        const limit = (req.query.limit) || 10;
        const skip = (page - 1) * limit;

        types = req.query.type

        if (!types) {
            const [users, genres, movies, seriess, episodes, subscriptions, payments, watchHistories, reviews] = await Promise.all([
                user.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                genre.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                movie.find().populate('genre').sort({ createdAt: -1 }).skip(skip).limit(limit),
                series.find().populate('genre').sort({ createdAt: -1 }).skip(skip).limit(limit),
                episode.find().populate({path : 'series',populate : {path : 'genre'}}).sort({ createdAt: -1 }).skip(skip).limit(limit),
                subscription.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                payment.find().populate('user').populate('subscription').sort({ createdAt: -1 }).skip(skip).limit(limit),
                watchHistory.find().populate('user').populate({path : 'movie',populate : {path : 'genre'}}).populate({path : 'episode',populate:{path : 'series',populate :{path : 'genre'}}}).sort({ createdAt: -1 }).skip(skip).limit(limit),
                review.find().populate('user').populate({path : 'movie',populate : {path : 'genre'}}).populate({path: 'series',populate : {path : 'genre'}}).sort({ createdAt: -1 }).skip(skip).limit(limit)
            ])
            return res.status(200).json({
                status: 'success',
                page, limit,
                message: "pagination sucessfull",
                data: {
                    users, genres, movies, seriess, episodes, subscriptions, payments, watchHistories, reviews
                }
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}


