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

        const type = req.query.type?.toLowerCase();

        if (!type) {
            const [users, genres, movies, seriess, episodes, subscriptions, payments, watchHistories, reviews, totalusers, totalgenres, totalmovies, totalseriess, totalepisodes, totalsubscriptions, totalpayments, totalwatchHistories, totalreviews] = await Promise.all([
                user.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                genre.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                movie.find().populate('genre').sort({ createdAt: -1 }).skip(skip).limit(limit),
                series.find().populate('genre').sort({ createdAt: -1 }).skip(skip).limit(limit),
                episode.find().populate({ path: 'series', populate: { path: 'genre' } }).sort({ createdAt: -1 }).skip(skip).limit(limit),
                subscription.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                payment.find().populate('user').populate('subscription').sort({ createdAt: -1 }).skip(skip).limit(limit),
                watchHistory.find().populate('user').populate({ path: 'movie', populate: { path: 'genre' } }).populate({ path: 'episode', populate: { path: 'series', populate: { path: 'genre' } } }).sort({ createdAt: -1 }).skip(skip).limit(limit),
                review.find().populate('user').populate({ path: 'movie', populate: { path: 'genre' } }).populate({ path: 'series', populate: { path: 'genre' } }).sort({ createdAt: -1 }).skip(skip).limit(limit),

                user.countDocuments(),
                genre.countDocuments(),
                movie.countDocuments(),
                series.countDocuments(),
                episode.countDocuments(),
                subscription.countDocuments(),
                payment.countDocuments(),
                watchHistory.countDocuments(),
                review.countDocuments()



            ])
            return res.status(200).json({
                status: 'success',
                page, limit,
                totalusers, totalgenres, totalmovies, totalseriess, totalepisodes, totalsubscriptions, totalpayments, totalwatchHistories, totalreviews,

                paginationMessage: "Pagination successful",
                dataMessage: "All data has been successfully found.",


                data: {
                    users, genres, movies, seriess, episodes, subscriptions, payments, watchHistories, reviews
                }
            })
        }
        if (type === 'user' || type === 'users') {
            const users = await user.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalusers = await user.countDocuments();
            res.status(200).json({
                status: page, limit, totalusers,
                data: users
            })

        }
        if (type === 'genre' || type === 'genres') {
            const genres = await genre.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalgenres = await genre.countDocuments();
            res.status(200).json({
                status: page, limit, totalgenres,
                data: genres
            })

        }
        if (type === 'movie' || type === 'movies') {
            const movies = await movie.find().populate('genre').sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalmovies = await movie.countDocuments();
            res.status(200).json({
                status: page, limit, totalmovies,
                data: movies
            })

        }
        if (type === 'series' || type === 'seriess') {
            const seriess = await series.find().populate('genre').sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalseriess = await series.countDocuments();
            res.status(200).json({
                status: page, limit, totalseriess,
                data: seriess
            })

        }
        if (type === 'episode' || type === 'episodes') {
            const episodes = await episode.find().populate({ path: 'series', populate: { path: 'genre' } }).sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalepisodes = await episode.countDocuments();
            res.status(200).json({
                status: page, limit, totalepisodes,
                data: episodes
            })

        }
        if (type === 'subscription' || type === 'subscriptions') {
            const subscriptions = await subscription.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalsubscriptions = await subscription.countDocuments();
            res.status(200).json({
                status: page, limit, totalsubscriptions,
                data: subscriptions
            })

        }
        if (type === 'payment' || type === 'payments') {
            const payments = await payment.find().populate('user').populate('subscription').sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalpayments = await payment.countDocuments();
            res.status(200).json({
                status: page, limit, totalpayments,
                data: payments
            })

        }
        if (type === 'watchHistory' || type === 'watchHistories') {
            const watchHistories = await watchHistory.find().populate('user').populate({ path: 'movie', populate: { path: 'genre' } }).populate({ path: 'episode', populate: { path: 'series', populate: { path: 'genre' } } }).sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalwatchHistories = await watchHistory.countDocuments();
            res.status(200).json({
                status: page, limit, totalwatchHistories,
                data: watchHistories
            })

        }
        if (type === 'review' || type === 'reviews') {
            const reviews = await review.find().populate('user').populate({ path: 'movie', populate: { path: 'genre' } }).populate({ path: 'series', populate: { path: 'genre' } }).sort({ createdAt: -1 }).skip(skip).limit(limit)
            const totalreviews = await review.countDocuments();
            res.status(200).json({
                status: page, limit, totalreviews,
                data: reviews
            })

        }

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
}


