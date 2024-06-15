import { AbsoluteFill } from 'remotion'
import { colors } from '../utils/colors'
import { ReactNode } from 'react'
import { loadFont } from '@remotion/google-fonts/Montserrat'
const { fontFamily } = loadFont()

export default function Background({ children }: { children: ReactNode }) {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.bg,
				fontFamily,
				fontWeight: 'bold',
			}}
		>
			<Board />
			{children}
		</AbsoluteFill>
	)
}

function Board() {
	return (
		<div
			style={{
				width: 900,
				height: 900,
				display: 'flex',
				flexDirection: 'column',
				position: 'absolute',
				left: -600,
				top: 200,
				transform: 'rotate(26deg)',
				borderWidth: 10,
				borderStyle: 'solid',
				borderColor: colors.tile.dark,
				borderRadius: 50,
				overflow: 'hidden',
			}}
		>
			{new Array(8).fill(0).map((_, row) => (
				<div
					key={'row-' + row}
					style={{
						display: 'flex',
						width: '100%',
						height: '100%',
					}}
				>
					{new Array(8).fill(0).map((_, col) => (
						<div
							key={'row-' + row + ';col-' + col}
							style={{
								background:
									col % 2 === row % 2 ? colors.tile.light : colors.tile.dark,
								width: '100%',
								height: '100%',
							}}
						></div>
					))}
				</div>
			))}
		</div>
	)
}
