export async function getData(date, username) {
    /* Get week num and date range */
    const thisWeekNum = getWeekNum(date)
    const firstGameDate = await getFirstGameDate(username)
    const firstGameWeekNum = getWeekNum(firstGameDate)
    const weekNum = thisWeekNum - firstGameWeekNum + 1

    const monday = getMonday(date)
    const sunday = new Date(
        new Date(date.setDate(monday.getDate() + 6)).setHours(23, 59, 59)
    )

    /* Get my weekly games */
    const myWeeklyGames = await getWeeklyGames(username, monday, sunday)

    /* Get my previous rating */
    const lastGameDate = new Date(myWeeklyGames[0].end_time * 1000)
    const myPreviousRating = await getRatingBeforeGame(
        username,
        formatMonth(lastGameDate.getMonth() + 1),
        lastGameDate.getFullYear(),
        myWeeklyGames[0].uuid
    )

    /* Get my new rating */
    const myNewRating = myWeeklyGames[myWeeklyGames.length - 1].player.rating

    /* Get highest rated opponent */
    let highestRatedOpponent = {
        username: null,
        avatar: null,
        rating: 0,
    }

    for (let i = 0; i < myWeeklyGames.length; i++) {
        const game = myWeeklyGames[i]
        if (getResult(game.result) === "win") {
            const gameDate = new Date(game.end_time * 1000)
            const opponentPreviousRating = await getRatingBeforeGame(
                game.opponent.username,
                formatMonth(gameDate.getMonth() + 1),
                gameDate.getFullYear(),
                game.uuid
            )

            if (opponentPreviousRating > highestRatedOpponent.rating) {
                highestRatedOpponent.rating = opponentPreviousRating
                highestRatedOpponent.username = game.opponent.username
            }
        }
    }

    if (highestRatedOpponent.username) {
        highestRatedOpponent.avatar = await getAvatarURL(
            highestRatedOpponent.username
        )
    }

    /* Get number of wins / draws / losses */
    let noOfWins = 0,
        noOfDraws = 0,
        noOfLosses = 0
    myWeeklyGames.forEach((game) => {
        if (getResult(game.result) === "win") noOfWins++
        else if (getResult(game.result) === "draw") noOfDraws++
        else noOfLosses++
    })

    return {
        weekNum,
        previousRating: myPreviousRating,
        newRating: myNewRating,
        noOfWins,
        noOfDraws,
        noOfLosses,
        noOfGames: noOfWins + noOfDraws + noOfLosses,
        opponentAvatarURL: highestRatedOpponent.avatar,
        opponentUsername: highestRatedOpponent.username,
        opponentRating: highestRatedOpponent.rating,
    }
}

export async function fetchGames(username, month, year) {
    const res = await fetch(
        `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
    )
    const { games } = await res.json()

    return games
        .filter((game) => game.time_class === "rapid")
        .map((game) => {
            const playerColor =
                game.white.username === username ? "white" : "black"
            const opponentColor = playerColor === "black" ? "white" : "black"
            return {
                uuid: game.uuid,
                end_time: game.end_time,
                result: getResult(game[playerColor].result),
                player: {
                    color: playerColor,
                    rating: game[playerColor].rating,
                    username,
                },
                opponent: {
                    color: opponentColor,
                    rating: game[opponentColor].rating,
                    username: game[opponentColor].username,
                },
            }
        })
}

export function getWeekNum(date) {
    const millsInWeek = 1000 * 3600 * 24 * 7
    const millsInDay = 1000 * 3600 * 24

    return Math.floor((date.valueOf() + millsInDay * 3) / millsInWeek)
}

export async function getFirstGameDate(username) {
    const archivesRes = await fetch(
        `https://api.chess.com/pub/player/${username}/games/archives`
    )
    const { archives } = await archivesRes.json()

    const [year, month] = archives[0].slice(-7).split("/")

    const games = await fetchGames(username, month, year)

    return new Date(games[0].end_time * 1000)
}

export function getResult(result) {
    if (result === "win") return "win"
    if (
        [
            "draw",
            "agreed",
            "stalemate",
            "repetition",
            "insufficient",
            "50move",
        ].includes(result)
    )
        return "draw"
    return "loss"
}

export function getMonday(date) {
    const day = date.getDay()
    const diff = date.getDate() - day + (day == 0 ? -6 : 1)
    return new Date(new Date(date.setDate(diff)).setHours(0, 0, 0))
}

export function formatMonth(month) {
    return month < 10 ? "0" + month : month.toString()
}

export async function getWeeklyGames(username, monday, sunday) {
    let allGames = []
    const thisMonthGames = await fetchGames(
        username,
        formatMonth(sunday.getMonth() + 1),
        sunday.getFullYear()
    )
    allGames = [...thisMonthGames]

    if (monday.getMonth() !== sunday.getMonth()) {
        const lastMonthGames = await fetchGames(
            username,
            formatMonth(monday.getMonth() + 1),
            monday.getFullYear()
        )
        allGames = [...allGames, ...lastMonthGames].sort(
            (a, b) => a.end_time - b.end_time
        )
    }

    return allGames.filter(
        (game) =>
            game.end_time * 1000 >= monday.valueOf() &&
            game.end_time * 1000 <= sunday.valueOf()
    )
}

export async function getAvatarURL(username) {
    const res = await fetch(`https://api.chess.com/pub/player/${username}`)
    const { avatar } = await res.json()

    if (avatar === undefined) return null

    return avatar || null
}

export async function getRatingBeforeGame(username, month, year, gameId) {
    const games = await fetchGames(username, month, year)

    for (let i = 0; i < games.length - 1; i++) {
        if (games[i + 1].uuid === gameId) {
            return games[i].player.rating
        }
    }

    // player's previous game wasn't during the specified month
    // get the most recent month the player had played a game
    const archivesRes = await fetch(
        `https://api.chess.com/pub/player/${username}/games/archives`
    )
    const { archives } = await archivesRes.json()

    for (let i = 0; i < archives.length - 1; i++) {
        const [currentYear, currentMonth] = archives[i].slice(-7).split("/")
        const [nextYear, nextMonth] = archives[i + 1].slice(-7).split("/")
        if (nextYear === year && nextMonth === month) {
            // the previous game took place in the month of 'currentMonth' of the year 'currentYear'
            const games = await fetchGames(username, currentMonth, currentYear)

            for (let i = 0; i < games.length - 1; i++) {
                if (games[i + 1].uuid === gameId) {
                    return games[i].player.rating
                }
            }
        }
    }

    // the player hadn't played a game before
    return 800
}
