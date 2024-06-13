import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import { colors } from '../utils/colors'
import { springDriver } from '../utils/springDriver'
import { makeTransform, scale, translate } from '@remotion/animation-utils'
import { WeekNum } from '../components/WeekNum'

export default function Scene2({
	weekNum,
	noOfGames,
}: {
	weekNum: number
	noOfGames: number
}) {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<WeekNum weekNum={weekNum} />
			<Text noOfGames={noOfGames} />
		</AbsoluteFill>
	)
}

function Text({ noOfGames }: { noOfGames: number }) {
	const { fps, width } = useVideoConfig()
	const frame = useCurrentFrame()

	const size = 260 /* width and height of the div container */

	const left = interpolate(
		springDriver({
			frame,
			fps,
			delay: 70,
			durationInFrames: 30,
		}),
		[0, 1],
		[width / 2 - size / 2, 50]
	)

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				height: size,
				width: size,
				position: 'absolute',
				left,
			}}
		>
			<AppearingText
				text='I played'
				delay={0}
				frame={frame}
				fps={fps}
				color={colors.white}
				fontSize={50}
			/>
			<AppearingText
				text={noOfGames.toString()}
				delay={20}
				frame={frame}
				fps={fps}
				color={colors.green.light}
				fontSize={100}
			/>
			<AppearingText
				text='games'
				delay={40}
				frame={frame}
				fps={fps}
				color={colors.white}
				fontSize={50}
			/>
		</div>
	)
}

function AppearingText({
	text,
	delay,
	frame,
	fps,
	color,
	fontSize,
}: {
	text: string
	delay: number
	frame: number
	fps: number
	color: string
	fontSize: number
}) {
	const transform = makeTransform([
		translate(
			0,
			interpolate(
				spring({
					frame,
					fps,
					delay,
					durationInFrames: 20,
				}),
				[0, 1],
				[50, 0]
			)
		),
		scale(
			spring({
				frame,
				fps,
				delay,
				durationInFrames: 20,
			})
		),
	])

	return <p style={{ margin: 0, fontSize, color, transform }}>{text}</p>
}
