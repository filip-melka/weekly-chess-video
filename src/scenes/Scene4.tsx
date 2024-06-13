import {
	AbsoluteFill,
	Img,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import { WeekNum } from '../components/WeekNum'
import { colors } from '../utils/colors'
import { makeTransform, scale } from '@remotion/animation-utils'

type Props = {
	weekNum: number
	avatarURL: string
	username: string
	rating: number
}

export default function Scene4({
	weekNum,
	avatarURL,
	username,
	rating,
}: Props) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

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
				<Text transform={appear({ frame, fps, delay: 10 })} />
				<Avatar
					username={username}
					avatarURL={avatarURL}
					transform={appear({ frame, fps, delay: 55 })}
				/>
				<Rating transform={appear({ frame, fps, delay: 75 })} rating={rating} />
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

function Text({ transform }: { transform: string }) {
	return (
		<p style={{ margin: 0, fontSize: 30, transform }}>
			Highest rated opponent I defeated
		</p>
	)
}

function Avatar({
	transform,
	avatarURL,
	username,
}: {
	transform: string
	avatarURL: string
	username: string
}) {
	return (
		<div
			style={{
				marginTop: 70,
				marginBottom: 50,
				transform,
			}}
		>
			<Img src={avatarURL} style={{ width: 140, borderRadius: 70 }} />
			<p
				style={{ fontSize: 25, margin: 0, marginTop: 10, fontWeight: 'normal' }}
			>
				{username}
			</p>
		</div>
	)
}

function Rating({ transform, rating }: { transform: string; rating: number }) {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 20,
				transform,
			}}
		>
			<Img src={staticFile('rapid-logo.png')} />
			<p style={{ fontSize: 35, margin: 0 }}>{rating}</p>
		</div>
	)
}
