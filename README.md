# 9 Dots Prototype Puzzles

A project for building prototype levels. This project is very early prototype and everything will be thrown away.

## Requirements

[Node.js](https://nodejs.org) is required
[Yarn](https://yarnpkg.com) is the preferred package manager and can be used to run scripts

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn` | Install project dependencies |
| `yarn start` | Build project and open web server running project |

## Getting Started
Before getting started make sure that you have yarn and node installed on your system. Reach out to Daniel on slack if you need help setting this up.

 After cloning the repo, run `yarn` from your project directory. Then, you can start the local development server by running `yarn start`. This will start your 
local development server on `http://localhost:8080` 


## Adding your own level
1. Create a new file `src/scenes` folder
2. Feel free to copy the levelTemplate.js file which has descriptions of each option
3. Add your new scene to the `src/scenes/index.js` file
4. Add your scene to the `src/index.js` file in the scene array.

## Scene Variables

#### key - string

the name of the scene

#### mixins - function
 Add the mixins that are imported from `prefabs/behaviors` separated by commas.
  - ForwardTurnMixin
  - DirectionMoverMixin
  - ForeverLooper


 This will add all of the blocks to your toolbox and add the code interpreter
 
 ```js
 const mixins = compose(ForeverLooper, DirectionMoverMixin)
 ```
 
 The order of these will determine where they show up in the toolbox. 
 They will show up in the reverse order so in the example above this will put
 the forever loop at the bottom

 #### levelLayout - array (matrix)
This matrix represents the level

 | Number | Description |
 |--------|-------------|
 | 0 | an empty space |
 | 1 | tile (a normal space) |
 | 2 | completion tile (the only way to win right now) |

```js
const levelLayout = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [2, 0, 0, 0]
]
```

#### botStartingPositions - array
Array of bot starting positions
Starting positions are an array in the form [x, y]
```js
const botStartingSpots = [[0, 0]]
```

#### boxes - array (optional)
array of objects as of right now the only key is location and
should be an array of the form [x, y]
```js
const boxes = [
  {location: [0, 0]},
]
```

#### blocked - array (optional)
array of blocked tiles positions (these should all be tiles that are defined in levelLayout with a 1 or 2)
Blocked positions are an array in the form [x, y]
```js
const blocked = [
  [0, 0]
]
```

#### switches - array (optional)
array of objects describing the switches in the level
 - location (array) - position of the switch in the form [x, y]
 - countdown (number) - how many bot moves the switch should stay activated for defaults to 1
 - target (array) - the position of the blocked tile it should fix (must be in the blocked array)
 ```js
 const switches = [
  {location: [0, 1], countdown: 1, target: [0, 0]},
]
```