import Background from './components/Background'
import { Sequence } from 'remotion'
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from './scenes/Scene4'
import Scene5 from './scenes/Scene5'
import Scene6 from './scenes/Scene6'

type Props = {
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

export default function MyComposition({
	weekNum,
	noOfGames,
	noOfWins,
	noOfDraws,
	noOfLosses,
	opponentAvatarURL,
	opponentUsername,
	opponentRating,
	previousRating,
	newRating,
}: Props) {
	return (
		<Background>
			<Sequence durationInFrames={100}>
				<Scene1 weekNum={weekNum} />
			</Sequence>
			{noOfGames > 0 ? (
				<>
					<Sequence from={100} durationInFrames={120}>
						<Scene2 weekNum={weekNum} noOfGames={noOfGames} />
					</Sequence>
					<Sequence from={220} durationInFrames={200}>
						<Scene3
							weekNum={weekNum}
							noOfGames={noOfGames}
							noOfWins={noOfWins}
							noOfDraws={noOfDraws}
							noOfLosses={noOfLosses}
						/>
					</Sequence>
					{opponentUsername && (
						<Sequence from={420} durationInFrames={200}>
							<Scene4
								weekNum={weekNum}
								username={opponentUsername}
								rating={opponentRating}
								avatarURL={
									opponentAvatarURL ||
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsbDRAHDZCUxgdFHSARF96NvKPWCboAe7-Q&s'
								}
							/>
						</Sequence>
					)}
				</>
			) : (
				<Sequence from={100} durationInFrames={200}>
					<Scene6 weekNum={weekNum} />
				</Sequence>
			)}
			<Sequence
				from={noOfGames === 0 ? 300 : opponentUsername ? 620 : 420}
				durationInFrames={200}
			>
				<Scene5
					weekNum={weekNum}
					previousRating={previousRating}
					newRating={newRating}
				/>
			</Sequence>
		</Background>
	)
}
