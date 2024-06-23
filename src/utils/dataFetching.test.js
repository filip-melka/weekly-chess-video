import {
	formatMonth,
	getAvatarURL,
	getFirstGameDate,
	getMonday,
	getRatingBeforeGame,
	getResult,
	getWeekNum,
	getWeeklyGames,
} from './dataFetching'

// getMonday
test('get monday of the week', () => {
	// Friday
	expect(getMonday(new Date('2024-06-14'))).toEqual(new Date('2024-06-10'))
	// Sunday
	expect(getMonday(new Date('2024-06-09'))).toEqual(new Date('2024-06-03'))
	// Monday
	expect(getMonday(new Date('2024-06-17'))).toEqual(new Date('2024-06-17'))
})

// getAvatarURL
describe('getting avatar URLs', () => {
	test('return avatar URL', async () => {
		const url = await getAvatarURL('filipmelka24')
		expect(url).not.toBeNull()
	})
	test('return null (the user does not have an avatar)', async () => {
		const url = await getAvatarURL('soujouksando')
		expect(url).toBeNull()
	})
})

// getWeeklyGames
describe('getting weekly games', () => {
	test('get weekly games', async () => {
		const games = await getWeeklyGames(
			'filipmelka24',
			new Date('2024-05-20'),
			new Date('2024-05-26')
		)
		expect(games.length).toBe(8)
		expect(games[0].uuid).toBe('84a77010-16d7-11ef-be4f-6cfe544c0428')
		expect(games[7].uuid).toBe('2a95935c-185f-11ef-9562-31b28401000f')
	})
	test('get weekly games (spreading over two months)', async () => {
		const games = await getWeeklyGames(
			'filipmelka24',
			new Date('2024-04-29'),
			new Date('2024-05-05')
		)
		expect(games.length).toBe(10)
		expect(games[0].uuid).toBe('6b5059b9-0621-11ef-aa9f-6cfe544c0428')
		expect(games[9].uuid).toBe('c239bcd8-0a2b-11ef-aa9f-6cfe544c0428')
	})
})

// getRatingBeforeGame
describe('getting pre-game ratings', () => {
	test('get pre-game ratings from my most recent game', async () => {
		const rating = await getRatingBeforeGame(
			'filipmelka24',
			'06',
			2024,
			'd8f9180b-298f-11ef-bcbd-c81de501000f'
		)
		expect(rating).toBe(971)
	})
	test('get pre-game ratings from my second game', async () => {
		const rating = await getRatingBeforeGame(
			'filipmelka24',
			'02',
			2024,
			'eb1fc4dd-c358-11ee-aec6-6cfe544c0428'
		)
		expect(rating).toBe(942)
	})
	test('first game - return 800', async () => {
		const rating = await getRatingBeforeGame(
			'filipmelka24',
			'02',
			2024,
			'69ff1817-c2a2-11ee-aec6-6cfe544c0428'
		)
		expect(rating).toBe(800)
	})
})

// getResult
test('evaluate result', () => {
	expect(getResult('win')).toEqual('win')
	expect(getResult('checkmated')).toEqual('loss')
	expect(getResult('agreed')).toEqual('draw')
	expect(getResult('repetition')).toEqual('draw')
	expect(getResult('timeout')).toEqual('loss')
	expect(getResult('resigned')).toEqual('loss')
	expect(getResult('stalemate')).toEqual('draw')
	expect(getResult('lose')).toEqual('loss')
	expect(getResult('insufficient')).toEqual('draw')
	expect(getResult('50move')).toEqual('draw')
	expect(getResult('abandoned')).toEqual('loss')
})

// getFirstGameDate
test('get the date of the first game', async () => {
	const date = await getFirstGameDate('filipmelka24')
	expect(date.getDate()).toEqual(3)
	expect(date.getMonth() + 1).toEqual(2)
	expect(date.getFullYear()).toEqual(2024)
})

// getWeekNum
test("the 'week nums' of two consecutive weeks differ by 1", () => {
	const weekNum1 = getWeekNum(new Date('2024-06-09'))
	const weekNum2 = getWeekNum(new Date('2024-06-15'))

	expect(weekNum2 - weekNum1).toBe(1)
})

// formatMonth
test("format month number, so that it's two characters long", () => {
	expect(formatMonth(12)).toBe('12')
	expect(formatMonth(5)).toBe('05')
})
