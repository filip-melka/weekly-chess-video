import Background from './components/Background'
import { Sequence } from 'remotion'
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'

type Props = {
	weekNum: number
	noOfGames: number
}

export default function MyComposition({ weekNum, noOfGames }: Props) {
	return (
		<Background>
			<Sequence durationInFrames={100}>
				<Scene1 weekNum={weekNum} />
			</Sequence>
			<Sequence from={100} durationInFrames={120}>
				<Scene2 weekNum={weekNum} noOfGames={noOfGames} />
			</Sequence>
		</Background>
	)
}
