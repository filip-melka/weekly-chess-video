import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import { springDriver } from '../utils/springDriver'
import { colors } from '../utils/colors'
import { makeTransform, rotate, translate } from '@remotion/animation-utils'

const timings = {
	Title: {
		durationInFrames: 30,
		delay: 30,
	},
	WeekNum: {
		durationInFrames: 30,
		delay: 50,
	},
	RapidText: {
		durationInFrames: 30,
		delay: 55,
	},
}

export default function Scene1({ weekNum }: { weekNum: number }) {
	const { height, fps } = useVideoConfig()
	const frame = useCurrentFrame()

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Title frame={frame} fps={fps} />
			<WeekNum height={height} frame={frame} weekNum={weekNum} fps={fps} />
			<RapidText frame={frame} fps={fps} />
			<Pawn frame={frame} fps={fps} />
		</AbsoluteFill>
	)
}

function Title({ fps, frame }: { fps: number; frame: number }) {
	const top = interpolate(
		springDriver({
			frame,
			fps,
			delay: timings.Title.delay,
			durationInFrames: timings.Title.durationInFrames,
		}),
		[0, 1],
		[110, -180]
	)

	return (
		<div
			style={{
				background: colors.green.dark,
				color: colors.white,
				fontSize: 35,
				padding: 10,
				paddingInline: 30,
				borderRadius: 10,
				position: 'absolute',
				top,
			}}
		>
			Weekly Chess Overview
		</div>
	)
}

function WeekNum({
	height,
	frame,
	fps,
	weekNum,
}: {
	height: number
	frame: number
	fps: number
	weekNum: number
}) {
	const top = interpolate(
		springDriver({
			frame,
			fps,
			delay: timings.WeekNum.delay,
			durationInFrames: timings.WeekNum.durationInFrames,
		}),
		[0, 1],
		[height / 2 - 50, 50]
	)
	const fontSize = interpolate(
		springDriver({
			frame,
			fps,
			delay: timings.WeekNum.delay,
			durationInFrames: timings.WeekNum.durationInFrames,
		}),
		[0, 1],
		[90, 30]
	)
	const opacity = interpolate(
		springDriver({
			frame,
			fps,
			delay: timings.WeekNum.delay,
			durationInFrames: timings.WeekNum.durationInFrames,
		}),
		[0.5, 1],
		[1, 0.4],
		{
			extrapolateLeft: 'clamp',
		}
	)

	return (
		<div
			style={{
				color: colors.white,
				fontSize,
				opacity,
				position: 'absolute',
				top,
			}}
		>
			Week #{weekNum}
		</div>
	)
}

function RapidText({ frame, fps }: { frame: number; fps: number }) {
	const bottom = interpolate(
		springDriver({
			frame,
			fps,
			delay: timings.RapidText.delay,
			durationInFrames: timings.RapidText.durationInFrames,
		}),
		[0, 1],
		[120, -100]
	)

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 20,
				fontSize: 35,
				color: colors.green.dark,
				position: 'absolute',
				bottom: bottom,
			}}
		>
			<Img src={staticFile('rapid-logo.png')} />
			<span>Rapid</span>
		</div>
	)
}

function Pawn({ frame, fps }: { frame: number; fps: number }) {
	const driver = spring({
		fps,
		frame,
		reverse: true,
		from: 1,
		to: 0,
		config: {
			stiffness: 100,
			damping: 13,
		},
		durationInFrames: 30,
		delay: 45,
	})

	const rotation = interpolate(driver, [0, 1], [-10, 10])
	const x = interpolate(driver, [0, 1], [0, 300])

	const transform = makeTransform([rotate(rotation), translate(x, 0)])

	return (
		<Img
			src={staticFile('pawn.png')}
			style={{
				position: 'absolute',
				right: 90,
				bottom: 90,
				width: 117,
				transform,
			}}
		/>
	)
}
