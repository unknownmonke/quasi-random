# Quasi-Random Generator

- Low discrepancy quasi-random sequence generator in any dimension.

    - Leverages golden ratio to evenly space points between each other.
    - For color values, adjacent values are **guaranteed to be different**.

- This is quasi-random and not pseudo-random :

    - Sequence is always the same.
    - In order to generate random colors each time, **N colors are taken at random** from a pool of 10000 generated values (max 100 out of 10 000).

- Sources :

    - [The Unreasonable Effectiveness of Quasirandom Sequences.](https://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)
    - [How to Generate Random Colors Programmatically.](https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/)

- A small HTML page enables **visualization** :

    - Plots 2-dimensional points of the sequence on a graph.
    - Generate N RGB colors (3-dimensional points) by picking random unique sample out of a pool of 10 000 values.

## Build

App is bundled as ESM with **Vite** (see `vite.config.js`). 

- Generator is available at [src/quasi-random.js](src/quasi-random.js).

*Usage :*

``` js
import { quasiRandom, sampleUnique } from './src/quasi-random.js';

const pool = quasiRandom(3, 10000);
const sample = sampleUnique(pool, 10);
```
#
### Setup

- `npm install`
- `npm run dev` - Starts Vite dev server.
- `npm run build` - Creates a production bundle in `dist/`.
- `npm run preview` - Previews the built site locally.