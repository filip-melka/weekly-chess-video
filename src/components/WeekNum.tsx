import { colors } from '../utils/colors'

export function WeekNum({ weekNum }: { weekNum: number }) {
	return (
		<div
			style={{
				color: colors.white,
				fontSize: 30,
				opacity: 0.4,
				position: 'absolute',
				top: 50,
			}}
		>
			Week #{weekNum}
		</div>
	)
}
