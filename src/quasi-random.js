'use strict';

/**
 * Compute phi constant used for stratified sequence generation.
 * 
 * @param {number} d - Dimensionality.
 * @returns {number}
 */
function phi(d) {
    let x = 2.0;
    for (let i = 0; i < 10; i++) {
        x = (1 + x) ** (1 / (d + 1));
    }
    return x;
}

/**
 * Generates a set of pseudo-random points in a d-dimensional space.
 * 
 * Seed number can be any real number. But seed = 0.5 might be marginally better.
 * Common default setting is typically seed = 0.
 * 
 * @param {number} dim - Number of dimensions.
 * @param {number} n - Number of points to generate.
 * @param {number} [seed=0] - Optional seed offset in range [0,1).
 * @returns {Array<number>} Array of n points, each an array of dim values in [0,1].
 */
export function quasi_random(dim, n, seed = 0) {

    if (!Number.isInteger(dim) || dim < 1) {
        throw new TypeError('dim must be a positive integer');
    }
    if (!Number.isInteger(n) || n < 0) {
        throw new TypeError('n must be a non-negative integer');
    }

    const list = [];
    const g = phi(dim);

    const alpha = new Array(dim);
    for (let i = 0; i < dim; i++) {
        alpha[i] = (1 / g) ** (i + 1) % 1;
    }

    // Generating value pool.
    for (let j = 0; j < n; j++) {
        const nuple = new Array(dim);

        for (let h = 0; h < dim; h++) {
            nuple[h] = (seed + alpha[h] * (j + 1)) % 1;
        }
        list[j] = nuple;
    }
    return list;
}

/**
 * Pick r unique sample points from a pool.
 * Fisher–Yates style partial shuffle.
 * 
 * @param {Array} pool - Pre-generated pool of points.
 * @param {int} r - Number of sample points to return from the generated value pool.
 * @return {Array} An array of r points, where each point is an array of pool dimension values in the range [0, 1].
 */
export function sample_unique(pool, r) {

    if (!Array.isArray(pool)) {
        throw new TypeError('pool must be an array');
    }
    if (!Number.isInteger(r) || r < 0) {
        throw new TypeError('r must be a non-negative integer');
    }
    if (r > pool.length) {
        throw new RangeError('r cannot be greater than pool length');
    }

    const shuffled = pool.slice();

    for (let i = 0; i < r; i++) {
        const j = i + Math.floor(Math.random() * (shuffled.length - i));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, r);
}

export default {
    quasi_random,
    sample_unique
};