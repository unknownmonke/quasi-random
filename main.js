'use strict';

const N_RGB = 100;

function phi(d) {
    let x = 2.0000;

    for (let i = 0; i < 10; i++) {
        x = (1 + x) ** (1 / (d + 1));
    }
    return x;
}

/**
 * Generates a set of pseudo-random points in a d-dimensional space.
 * @param {*} dim - Number of dimensions.
 * @param {*} n - Number of points to generate.
 * @return {Array} - An array of n points, where each point is an array of dim values in the range [0, 1].
 */
function generate(dim, n) {
    /**
     * This number can be any real number. But seed = 0.5 might be marginally better.
     * Common default setting is typically seed = 0.
     */
    const seed = 0;

    const list = [];
    const g = phi(dim);

    const alpha = [];
    for (let i = 0; i < dim; i++) {
        alpha[i] = (1 / g) ** (i + 1) % 1;
    }

    // Generating value pool.
    for (let j = 0; j < n; j++) {
        const nuple = [];

        for (let h = 0; h < dim; h++) {
            nuple[h] = (seed + alpha[h] * (j + 1)) % 1;
        }
        list[j] = nuple;
    }
    return list;
}

/**
 * Picks sample values from a pre-generated pool of points in a d-dimensional space.
 * @param {*} pool The pre-generated pool of points.
 * @param {*} r Number of sample points to return from the generated value pool.
 * @return {Array} An array of r points, where each point is an array of pool dimension values in the range [0, 1].
 */
function generate_from_pool(pool, r) {

    if (r > pool.length) {
        throw new Error("Number of sample points to return cannot be greater than the number of generated points.");
    }

    const values = [];
    const indexes = [];

    for (let k = 0; k < r; k++) {
        let index = Math.round(Math.random() * (pool.length - 1) );

        while (indexes.includes(index)) {
            index = Math.round(Math.random() * (pool.length - 1) );
        }
        indexes[k] = index;
        values[k] = pool[index];
    }
    return values;
}

function to_rgb(list) {
    return list.map(values => 
        values.map(val => Math.round(val * 255))
    );
}

const values = to_rgb(generate_from_pool(generate(3, N_RGB), 10));

for(let l = 0; l < values.length; l++) {
    document.getElementById(l + 1).style.background = `rgb(${values[l][0]}, ${values[l][1]}, ${values[l][2]})`;
}