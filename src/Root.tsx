import { Composition } from 'remotion'
import MyComposition from './Composition'

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id='MyComp'
				component={MyComposition}
				durationInFrames={300}
				fps={30}
				width={1200}
				height={674}
				defaultProps={{
					weekNum: 1,
					noOfGames: 5,
				}}
			/>
		</>
	)
}
