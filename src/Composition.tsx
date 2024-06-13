import Background from './components/Background'
import { Sequence } from 'remotion'
import Scene1 from './scenes/Scene1'

type Props = {
	weekNum: number
}

export default function MyComposition({ weekNum }: Props) {
	return (
		<Background>
			<Sequence durationInFrames={100}>
				<Scene1 weekNum={weekNum} />
			</Sequence>
		</Background>
	)
}
