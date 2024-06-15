import { Composition } from 'remotion'
import MyComposition from './Composition'
import { getData } from './utils/dataFetching.js'

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
	weekNum: 15,
	noOfGames: 5,
	noOfWins: 2,
	noOfDraws: 2,
	noOfLosses: 1,
	opponentAvatarURL: null,
	opponentUsername: 'filipmelka24',
	opponentRating: 896,
	previousRating: 825,
	newRating: 855,
}

const noWinsGames = {
	weekNum: 9,
	noOfGames: 5,
	noOfWins: 0,
	noOfDraws: 2,
	noOfLosses: 3,
	opponentAvatarURL: null,
	opponentUsername: null,
	opponentRating: 0,
	previousRating: 825,
	newRating: 813,
}

const noGames = {
	weekNum: 5,
	noOfGames: 0,
	noOfWins: 0,
	noOfDraws: 0,
	noOfLosses: 0,
	opponentAvatarURL: null,
	opponentUsername: null,
	opponentRating: 896,
	previousRating: 825,
	newRating: 825,
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
				defaultProps={noGames}
				calculateMetadata={async ({ props }) => {
					const data = await getData(new Date('2024-06-15'), 'filipmelka24')
					console.log(data)
					// ---
					let durationInFrames = 820
					if (props.noOfGames === 0) durationInFrames = 500
					else if (props.noOfWins === 0) durationInFrames = 620

					return {
						durationInFrames,
					}
				}}
			/>
		</>
	)
}
