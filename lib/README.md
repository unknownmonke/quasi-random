# Quasi-Random Generator

- Low discrepancy quasi-random sequence generator in any dimension.

    - Leverages golden ratio to evenly space points between each other.
    - For color values, adjacent values are **guaranteed to be different**.

- Sources :

    - [The Unreasonable Effectiveness of Quasirandom Sequences.](https://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)
    - [How to Generate Random Colors Programmatically.](https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/)

- See [source repository](https://github.com/unknownmonke/quasi-random) for a live example.

#
### Usage

- `npm install @unknownmonke/quasi-random`.

*Ex :*

``` js
import { quasiRandom, sampleUnique } from '@unknownmonke/quasi-random';

// Generates the first 10 000 values in dimension 3 -> number[10000][3].
const pool = quasiRandom(3, 10000);

// Selects 10 unique values at random out of the pool.
const sample = sampleUnique(pool, 10);
```