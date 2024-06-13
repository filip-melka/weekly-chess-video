import { Composition } from 'remotion'
import MyComposition from './Composition'

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id='MyComp'
				component={MyComposition}
				durationInFrames={700}
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
						'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg',
					opponentUsername: 'itsfilipmelka',
					opponentRating: 896,
				}}
			/>
		</>
	)
}
