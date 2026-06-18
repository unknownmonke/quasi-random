# Quasi-Random Generator

- Low discrepancy quasi-random sequence generator in any dimension.

    - Leverages golden ratio to evenly space points between each other.
    - For color values, adjacent values are **guaranteed to be different**.

- This is quasi-random and not pseudo-random :

    - Sequence is always the same.
    - In order to generate random values, sample values must be taken at random from the generated pool.

- Sources :

    - [The Unreasonable Effectiveness of Quasirandom Sequences.](https://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)
    - [How to Generate Random Colors Programmatically.](https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/)

## Content 

- This repo contains 2 parts :

    - Generator library with its own package `@unknownmonke/quasi-random`.

    - Small HTML page to **visualize** examples :

        - Plots 2-dimensional points of the sequence on a graph.
        - Generate N RGB colors (3-dimensional points) by picking random unique sample out of a pool of 10 000 values.

## HTML Page

- Bundled as ESM with **Vite** (see `vite.config.js`).

- Setup :

    - `npm install`
    - `npm run dev` - Starts Vite dev server.
    - `npm run build` - Creates a production bundle in `dist/`.
    - `npm run preview` - Previews the built site locally.

## Library

- `/lib` folder hosts package with only the generator.

- Package is scoped to `@unknownmonke`.

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
#
### Publishing

- Set up **Granular Access Token (GAT)** or security key ([Doc](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)).

- Add token to `.npmrc` in package root directory.

- Review package contents with `npm pack --dry-run`.

    *Ex :*

    ```
    > D:\projects\color\lib> npm pack --dry-run
    npm notice 
    npm notice 📦 @unknownmonke/quasi-random@1.0.0
    npm notice === Tarball Contents === 
    npm notice 1.1kB LICENSE        
    npm notice 1.0kB README.md      
    npm notice 596B  package.json   
    npm notice 2.5kB quasi-random.js
    npm notice === Tarball Details === 
    npm notice name:          @unknownmonke/quasi-random              
    npm notice version:       1.0.0                                   
    npm notice filename:      @unknownmonke/quasi-random-1.0.0.tgz    
    npm notice package size:  2.6 kB                                  
    npm notice unpacked size: 5.4 kB                                  
    npm notice shasum:        a7f839e5890255ff10cb62cd4884f5eff2db7b66
    npm notice integrity:     sha512-8q/S+QAq85rMp[...]1FMZXPDW3CX+w==
    npm notice total files:   5                                       
    npm notice 
    unknownmonke-quasi-random-1.0.0.tgz
    ```

- Publish with `npm publish --access public` from package root directory.

    *Ex :*

    ```
    > D:\projects\color\lib> npm publish --access public                                                             
    npm notice
    npm notice 📦 @unknownmonke/quasi-random@1.0.0
    npm notice Tarball Contents
    npm notice 1.1kB LICENSE
    npm notice 1.0kB README.md
    npm notice 600B package.json
    npm notice 2.5kB quasi-random.js
    npm notice Tarball Details
    npm notice name: @unknownmonke/quasi-random
    npm notice version: 1.0.0
    npm notice filename: unknownmonke-quasi-random-1.0.0.tgz
    npm notice package size: 2.5 kB
    npm notice unpacked size: 5.3 kB
    npm notice shasum: 40d5bcf78b6b4116addbc8ffa6a6caa4d25cd26d
    npm notice integrity: sha512-mA3SLFmWzfsoC[...]3klA9rbKMoRNA==
    npm notice total files: 4
    npm notice
    npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
    + @unknownmonke/quasi-random@1.0.0
    ```