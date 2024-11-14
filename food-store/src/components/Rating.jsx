import { MarkedRatingStar, UnmarkedRatingStar} from './icons/index'

export default function RatingComponent({ rating }) {
    return (
        <div className="flex items-center">
            {[...Array(rating)].map((_, index) => (
                <MarkedRatingStar key={index} />
            ))}
            {[...Array(5 - rating)].map((_, index) => (
                <UnmarkedRatingStar key={index} />
            ))}
        </div>
    )
}