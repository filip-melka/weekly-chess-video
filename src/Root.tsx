import { Composition } from 'remotion'
import MyComposition from './Composition'

const regularGames = {
	weekNum: 1,
	noOfGames: 5,
	noOfWins: 2,
	noOfDraws: 2,
	noOfLosses: 1,
	opponentAvatarURL:
		'https://images.chesscomfiles.com/uploads/v1/user/342783555.cf63d771.200x200o.63c562ed1dc1.jpg',
	opponentUsername: 'filipmelka24',
	opponentRating: 896,
	originalRating: 825,
	newRating: 855,
}

const noAvatarImage = {
	weekNum: 1,
	noOfGames: 5,
	noOfWins: 2,
	noOfDraws: 2,
	noOfLosses: 1,
	opponentAvatarURL: null,
	opponentUsername: 'filipmelka24',
	opponentRating: 896,
	originalRating: 825,
	newRating: 855,
}

const noWinsGames = {
	weekNum: 1,
	noOfGames: 5,
	noOfWins: 0,
	noOfDraws: 2,
	noOfLosses: 3,
	opponentAvatarURL: null,
	opponentUsername: null,
	opponentRating: 0,
	originalRating: 825,
	newRating: 855,
}

const noGames = {
	weekNum: 1,
	noOfGames: 0,
	noOfWins: 0,
	noOfDraws: 0,
	noOfLosses: 0,
	opponentAvatarURL: null,
	opponentUsername: null,
	opponentRating: 896,
	originalRating: 825,
	newRating: 855,
}

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id='MyComp'
				component={MyComposition}
				durationInFrames={820}
				fps={30}
				width={1200}
				height={674}
				defaultProps={noAvatarImage}
			/>
		</>
	)
}
