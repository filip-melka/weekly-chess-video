import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import { WeekNum } from '../components/WeekNum'
import { colors } from '../utils/colors'
import { makeTransform, scale, translate } from '@remotion/animation-utils'

type Props = {
	weekNum: number
	noOfGames: number
	noOfWins: number
	noOfDraws: number
	noOfLosses: number
}

export default function Scene3({
	weekNum,
	noOfGames,
	noOfWins,
	noOfDraws,
	noOfLosses,
}: Props) {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<WeekNum weekNum={weekNum} />
			<Text noOfGames={noOfGames} />
			<Stats
				noOfWins={noOfWins}
				noOfDraws={noOfDraws}
				noOfLosses={noOfLosses}
			/>
		</AbsoluteFill>
	)
}

type StatsProps = {
	noOfWins: number
	noOfDraws: number
	noOfLosses: number
}

function Stats({ noOfWins, noOfDraws, noOfLosses }: StatsProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()
	const totalNoOfGames = noOfWins + noOfDraws + noOfLosses
	const transform = makeTransform([
		scale(
			spring({
				frame,
				fps,
				delay: 200,
				durationInFrames: 20,
				reverse: true,
				config: {
					mass: 0.7,
				},
			})
		),
	])

	return (
		<div style={{ position: 'absolute', right: 50, transform }}>
			<div
				style={{
					color: colors.white,
					display: 'flex',
					gap: 70,
				}}
			>
				<Stat
					noOfGames={noOfWins}
					symbol='+'
					text='Won'
					color={colors.green.light}
					totalNoOfGames={totalNoOfGames}
					delay={0}
				/>
				<Stat
					noOfGames={noOfDraws}
					symbol='='
					text='Drawn'
					color={colors.gray}
					totalNoOfGames={totalNoOfGames}
					delay={40}
				/>
				<Stat
					noOfGames={noOfLosses}
					symbol='-'
					text='Lost'
					color={colors.red}
					totalNoOfGames={totalNoOfGames}
					delay={80}
				/>
			</div>
			{/* progress bar */}
			<div
				style={{
					height: 30,
					width: '100%',
					marginTop: 40,
					borderRadius: 15,
					overflow: 'hidden',
					display: 'flex',
				}}
			>
				<Bar
					width={Math.ceil((noOfWins / totalNoOfGames) * 100)}
					background={colors.green.light}
					delay={0}
				/>
				<Bar
					width={Math.ceil((noOfDraws / totalNoOfGames) * 100)}
					background={colors.gray}
					delay={40}
				/>
				<Bar
					width={Math.ceil((noOfLosses / totalNoOfGames) * 100)}
					background={colors.red}
					delay={80}
				/>
			</div>
		</div>
	)
}

function Bar({
	width,
	background,
	delay,
}: {
	width: number
	background: string
	delay: number
}) {
	const frame = useCurrentFrame()
	const animatedWidth = interpolate(frame, [delay, delay + 40], [0, width], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	})
	return (
		<div
			style={{
				height: 30,
				width: `${animatedWidth}%`,
				background,
			}}
		/>
	)
}

type StatProps = {
	noOfGames: number
	symbol: string
	text: string
	color: string
	totalNoOfGames: number
	delay: number
}

function Stat({
	noOfGames,
	symbol,
	text,
	color,
	totalNoOfGames,
	delay,
}: StatProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

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

	return (
		<div style={{ transform }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 20,
					fontSize: 38,
				}}
			>
				<div
					style={{
						background: color,
						color: colors.bg,
						width: 30,
						height: 30,
						borderRadius: 6,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{symbol}
				</div>
				<p style={{ margin: 0 }}>{`${noOfGames} ${text}`}</p>
			</div>
			<p
				style={{
					margin: 0,
					marginTop: 10,
					marginLeft: 50,
					fontWeight: 'normal',
					fontSize: 30,
				}}
			>
				{`${((noOfGames / totalNoOfGames) * 100).toFixed(1)}%`}
			</p>
		</div>
	)
}

function Text({ noOfGames }: { noOfGames: number }) {
	const size = 260 /* width and height of the div container */

	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()
	const transform = makeTransform([
		scale(
			spring({
				frame,
				fps,
				delay: 210,
				durationInFrames: 20,
				reverse: true,
			})
		),
	])

	return (
		<div
			style={{
				transform,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
				height: size,
				width: size,
				position: 'absolute',
				left: 50,
			}}
		>
			<p style={{ margin: 0, fontSize: 50, color: colors.white }}>I played</p>
			<p style={{ margin: 0, fontSize: 100, color: colors.green.light }}>
				{noOfGames}
			</p>
			<p style={{ margin: 0, fontSize: 50, color: colors.white }}>games</p>
		</div>
	)
}
