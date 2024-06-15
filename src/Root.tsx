import { Composition } from 'remotion'
import MyComposition from './Composition'
import { getData } from './utils/dataFetching.js'

const defaultProps = {
	weekNum: 0,
	noOfGames: 0,
	noOfWins: 0,
	noOfDraws: 0,
	noOfLosses: 0,
	opponentAvatarURL: null,
	opponentUsername: null,
	opponentRating: 0,
	previousRating: 0,
	newRating: 0,
}

type WeeklyData = {
	weekNum: number
	noOfGames: number
	noOfWins: number
	noOfDraws: number
	noOfLosses: number
	opponentAvatarURL: string | null
	opponentUsername: string | null
	opponentRating: number
	previousRating: number
	newRating: number
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
				defaultProps={defaultProps}
				calculateMetadata={async () => {
					const lastWeekDate = new Date(
						new Date().valueOf() - 7 * 24 * 3600 * 1000
					)

					const data: WeeklyData = await getData(lastWeekDate, 'filipmelka24')

					let durationInFrames = 820
					if (data.noOfGames === 0) durationInFrames = 500
					else if (data.noOfWins === 0) durationInFrames = 620

					return {
						durationInFrames,
						props: data,
					}
				}}
			/>
		</>
	)
}
