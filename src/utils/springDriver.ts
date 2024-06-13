import { spring } from 'remotion'

type Props = {
	frame: number
	fps: number
	delay: number
	durationInFrames: number
}

export function springDriver({ frame, fps, delay, durationInFrames }: Props) {
	return spring({
		frame,
		fps,
		reverse: true,
		from: 1,
		to: 0,
		delay,
		durationInFrames,
		config: {
			mass: 0.7,
			stiffness: 115,
		},
	})
}
