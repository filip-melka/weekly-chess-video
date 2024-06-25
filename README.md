# Weekly Chess Overview

<p align="center">
  <img src="https://github.com/filip-melka/weekly-chess-overview/assets/173664063/1adb481d-8b94-40c9-8cc9-40167c8ce740" />
</p>

A [Remotion](https://www.remotion.dev/) project for creating weekly chess overview videos based on data from [Chess.com](https://www.chess.com/).

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/a7da2110-1f2c-4323-b172-3d19f5bb0353

## How to use it

1. Clone this repo
2. Install dependencies:
  ```
  npm install
  ```
3. Set up environment variables:
  - Create a `.env` file in the root directory and add your Chess.com username:
  ```.env
  USERNAME=<your-username>
  ```
4. View the video in the editor:
  ```
  npm start
  ```
5. Render the video:
  ```
  npx remotion render
  ```

## How it works

Using the [calculateMetadata](https://www.remotion.dev/docs/calculate-metadata) prop, the data for the specified Chess.com user is fetched for the past week. This data includes:

- Number of games played
  - Number of wins
  - Number of draws
  - Number of losses
- Player's rating at the beginning of the week
- Player's rating at the end of the week
- Highest rated opponent the player had defeated

This data is then used to create the video.

> A week is from Monday to Sunday.

### Fetching the data

The data is fetched using the `getData()` function (in `src/utils/dataFetching.js`). This function takes the following arguments:

- `date` - any date within the week for which data is to be fetched
- `username` - the player's username

#### Testing

Tests for all helper functions used by the `getData()` function are located in `src/utils/dataFetching.test.js`.

To run these tests, use the following command:

```
npm test
```

<p align="center">
  <img width="75%" src="https://github.com/filip-melka/weekly-chess-overview/assets/173664063/7318fa20-cc7c-4fe6-b053-d3eb89682e62" />
</p>

## Scenes

The video consists of 5 main scenes (and 1 extra scene for an edge case). Each scene is a React functional component wrapped inside a `<Sequence>` component.

### `Scene1` - Intro

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/c9a39cac-f668-49c3-918b-401130bc2160

### `Scene2` - Number of games

This scene shows the number of games the player played during the week.

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/744a976e-18f8-4600-a69c-24c17903e104

### `Scene3` - Number of wins / draws / losses

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/d3082fa8-d804-4f6a-a592-9ce9f6999683

### `Scene4` - Highest rated opponent the player had defeated

This scene shows the username and avatar of the highest-rated opponent the player defeated, along with the opponent's rating before the game.

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/1bf434d6-0e6b-47cb-8030-f220215f7264

### `Scene5` - Change in player's rating

This scene shows the player's rating change over the week.

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/715c67c7-bb30-4f41-941b-359af340052a

### `Scene6` (extra) - No games last week

This is a placeholder scene for when the player didn't play any games during the week.

https://github.com/filip-melka/weekly-chess-overview/assets/173664063/dddc9a14-240c-4a61-9b7b-5baa3e137f47

## Edge cases

### Player had no wins

If the player had no wins, `Scene4` is omitted.

### Player didn't play any games

If the player didn't play any game during the week, `Scene6` is shown instead of `Scene2`, `Scene3`, and `Scene4`.
