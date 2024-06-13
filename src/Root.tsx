import { Composition } from 'remotion'
import MyComposition from './Composition'

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
				defaultProps={{
					weekNum: 1,
					noOfGames: 5,
					noOfWins: 2,
					noOfDraws: 2,
					noOfLosses: 1,
					opponentAvatarURL:
						'https://cdn.hashnode.com/res/hashnode/image/upload/v1704265966452/HqKDXjGgI.png?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp',
					opponentUsername: 'filipmelka24',
					opponentRating: 896,
					originalRating: 825,
					newRating: 855,
				}}
			/>
		</>
	)
}
