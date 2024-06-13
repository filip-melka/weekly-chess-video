import Background from './components/Background'
import { Sequence } from 'remotion'
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from './scenes/Scene4'

type Props = {
	weekNum: number
	noOfGames: number
	noOfWins: number
	noOfDraws: number
	noOfLosses: number
	opponentAvatarURL: string
	opponentUsername: string
	opponentRating: number
}

export default function MyComposition({
	weekNum,
	noOfGames,
	noOfWins,
	noOfDraws,
	noOfLosses,
	opponentAvatarURL,
	opponentUsername,
	opponentRating,
}: Props) {
	return (
		<Background>
			<Sequence durationInFrames={100}>
				<Scene1 weekNum={weekNum} />
			</Sequence>
			<Sequence from={100} durationInFrames={120}>
				<Scene2 weekNum={weekNum} noOfGames={noOfGames} />
			</Sequence>
			<Sequence from={220} durationInFrames={230}>
				<Scene3
					weekNum={weekNum}
					noOfGames={noOfGames}
					noOfWins={noOfWins}
					noOfDraws={noOfDraws}
					noOfLosses={noOfLosses}
				/>
			</Sequence>
			<Sequence from={450} durationInFrames={200}>
				<Scene4
					weekNum={weekNum}
					username={opponentUsername}
					rating={opponentRating}
					avatarURL={opponentAvatarURL}
				/>
			</Sequence>
		</Background>
	)
}
