# Figmotion Anime.js helper
This helper package can help you import your animation JSON export into an [Anime.js](https://github.com/juliangarnier/anime) timeline.

## Usage
1. Export your animation as JSON from Figmotion
2. Create the starting point of your actual design.
We will not export your animation as HTML/CSS as this is not something Figmotion can do while guaranteeing a certain level of code quality on the HTML and CSS side. This means you will need to create your design manually first.
3. Assign the correct ID's to your HTML structure. (you can check your JSON export, to identify which ID's are being used)
4. Use the helper function to create a animejs timeline from the Figmotion JSON data.

Example
```js
import animation from './animation.json';
import { figmotionToAnimeTimeline } from '../lib';
figmotionToAnimeTimeline(animation);
```

## Function parameters
| Name | Description | Required |
|----|----|---|
| `object` | The JSON export from Figmotion, as-is | ✅ |
| `timelineOptions` | Additional options to pass to the `anime.timeline` function | |
| `valueOverride(childId, propertyName, keyframe, previousKeyframe, index, allKeyframes)` | If you want to override the keyframe properties that are being passed to animejs | |