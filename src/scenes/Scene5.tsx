import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import { colors } from '../utils/colors'
import { WeekNum } from '../components/WeekNum'
import { makeTransform, scale } from '@remotion/animation-utils'

type Props = {
	weekNum: number
	originalRating: number
	newRating: number
}

export default function Scene5({ weekNum, originalRating, newRating }: Props) {
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
				<Text
					ratingHasChanged={newRating !== originalRating}
					transform={appear({ frame, fps, delay: 20 })}
				/>
				<Rating
					transform={appear({ frame, fps, delay: 40 })}
					originalRating={originalRating}
					newRating={newRating}
					frame={frame}
					fps={fps}
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

function Text({
	transform,
	ratingHasChanged,
}: {
	transform: string
	ratingHasChanged: boolean
}) {
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
			<p style={{ fontSize: 35, margin: 0 }}>
				{ratingHasChanged ? 'My new rapid rating' : 'My rapid rating is'}
			</p>
		</div>
	)
}
function Rating({
	transform,
	originalRating,
	newRating,
	frame,
	fps,
}: {
	transform: string
	originalRating: number
	newRating: number
	frame: number
	fps: number
}) {
	const value = interpolate(frame, [70, 110], [originalRating, newRating], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	})

	return (
		<div
			style={{
				marginTop: 100,
				marginBottom: 120,
				transform,
				width: 170,
				marginInline: 'auto',
			}}
		>
			<div style={{ position: 'relative' }}>
				<p style={{ fontSize: 65, margin: 0 }}>{value.toFixed(0)}</p>
			</div>
			<p
				style={{
					position: 'absolute',
					bottom: -50,
					right: -70,
					fontSize: 30,
					transform: appear({ frame, fps, delay: 70 }),
					color: newRating > originalRating ? colors.green.light : colors.red,
				}}
			>
				{differenceSymbol({ originalRating, newRating })}{' '}
				{newRating !== originalRating
					? Math.abs(newRating - originalRating)
					: ''}
			</p>
		</div>
	)
}

function differenceSymbol({
	originalRating,
	newRating,
}: {
	originalRating: number
	newRating: number
}) {
	if (newRating > originalRating) return '▲'
	if (newRating < originalRating) return '▼'
	return ''
}
