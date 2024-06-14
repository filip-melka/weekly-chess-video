import {
	AbsoluteFill,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import { colors } from '../utils/colors'
import { makeTransform, scale } from '@remotion/animation-utils'
import { WeekNum } from '../components/WeekNum'
import { Gif } from '@remotion/gif'

const GIFs = [
	'https://media0.giphy.com/media/10zsjaH4g0GgmY/giphy.gif?cid=6c09b952kop0w7zcr9xjk3ymivcfa4omgq8umchoy20kjzw6&ep=v1_gifs_search&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/gaD8UP5BA0mVYrRbDd/200w.gif?cid=6c09b952i5yuz7h9uhya8wyvgld2i6q57lczme7jgel9764e&ep=v1_gifs_search&rid=200w.gif&ct=g',
	'https://raw.githubusercontent.com/gist/mymindwentblvnk/42f9e87d42e8228999634192c33ea9ec/raw/1d9dba8a8a54de3eef529a9194f173152df439b7/busy.gif',
]

export default function Scene6({ weekNum }: { weekNum: number }) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	const randomGIFIndex = Math.floor(random(weekNum) * GIFs.length)

	const transform = scale(
		spring({
			frame,
			fps,
			delay: 180,
			durationInFrames: 15,
			reverse: true,
			config: {
				mass: 0.7,
			},
		})
	)

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				color: colors.white,
				textAlign: 'center',
			}}
		>
			<WeekNum weekNum={weekNum} />
			<div style={{ transform }}>
				<p
					style={{
						transform: appear({ frame, fps, delay: 30 }),
						fontSize: 30,
						marginBottom: 60,
					}}
				>
					There was no time for chess this week...🤷‍♂️
				</p>
				<Gif
					src={GIFs[randomGIFIndex]}
					style={{
						transform: appear({ frame, fps, delay: 60 }),
						height: 300,
						borderRadius: 5,
					}}
				/>
			</div>
		</AbsoluteFill>
	)
}

function appear({
	frame,
	fps,
	delay,
}: {
	frame: number
	fps: number
	delay: number
}) {
	return makeTransform([
		scale(
			spring({
				frame,
				fps,
				delay,
				durationInFrames: 20,
				config: {
					mass: 0.7,
				},
			})
		),
	])
}
