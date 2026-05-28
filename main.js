'use strict';

const MAX_RGB = 100;
const MAX_GRAPH = 1000;

const RGB_POOL_SIZE = 10000; // Number of points to pre-generate in the value pool.

// -------------------------------------------------------- //
//                         Generator                        //
// -------------------------------------------------------- //

function phi(d) {
    let x = 2.0000;

    for (let i = 0; i < 10; i++) {
        x = (1 + x) ** (1 / (d + 1));
    }
    return x;
}

/**
 * Generates a set of pseudo-random points in a d-dimensional space.
 * @param {int} dim - Number of dimensions.
 * @param {int} n - Number of points to generate.
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
 * Picks sample values from a pre-generated pool of points in a d-dimensional space. Fisher–Yates algorithm.
 * @param {Array} pool The pre-generated pool of points.
 * @param {int} r Number of sample points to return from the generated value pool.
 * @return {Array} An array of r points, where each point is an array of pool dimension values in the range [0, 1].
 */
function sample_unique(pool, r) {

    if (r > pool.length) {
        throw new Error("Number of sample points to return cannot be greater than the number of generated points.");
    }

    const shuffled = pool.slice();
    
    for (let i = 0; i < r; i++) {
        const j = i + Math.floor(Math.random() * (shuffled.length - i));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, r);
}


// -------------------------------------------------------- //
//                      RGB generation                      //
// -------------------------------------------------------- //

/**
 * Validates input value between [0, max].
 * Values outside of this range are set to the closest boundary value.
 */
function validate_input(value, max) {
    const number = Number.parseInt(value, 10);

    if (!Number.isInteger(number) || number < 0) {
        return 0;
    }
    return Math.min(number, max);
}

function to_rgb(list) {
    return list.map(values => values.map(val => Math.round(val * 255)));
}

function update_rgb_preview(input, container, pool) {
    const n = validate_input(input.value, MAX_RGB);
    input.value = n;

    const colors = to_rgb(sample_unique(pool, n));

    container.innerHTML = "";

    colors.forEach(([r, g, b]) => {
        const node = document.createElement('div');
        node.className = 'preview';
        node.style.background = `rgb(${r}, ${g}, ${b})`;
        container.appendChild(node);
    });
}


// -------------------------------------------------------- //
//                     Graph generation                     //
// -------------------------------------------------------- //

// Plots N generated values on a graph using Chart.js library.

// Custom graph borders plugin.
const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
        const { ctx, chartArea: { left, top, width, height }} = chart;

        ctx.save();
        ctx.strokeStyle = options.borderColor || '#000';
        ctx.lineWidth = options.borderWidth || 2;

        ctx.strokeRect(left, top, width, height);
        ctx.restore();
    }
};

const chart = new Chart("distribution-graph", {
    type: "scatter",
    data: {
        datasets: [{
            pointRadius: 4,
            data: []
        }]
    },
    options: {
        maintainAspectRatio: false,
        events: [],
        plugins: {
            legend: {
                display: false
            },
            chartAreaBorder: {
                borderColor: '#929292',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    },
    plugins: [chartAreaBorder]
});

function update_graph(input, chart) {
    const n = validate_input(input.value, MAX_GRAPH);
    input.value = n;

    const points = generate(2, n).map(([x, y]) => ({ x, y }));

    chart.data.datasets[0].data = points;
    chart.update();
}


// -------------------------------------------------------- //
//                        DOM actions                       //
// -------------------------------------------------------- //

document.addEventListener('DOMContentLoaded', () => {

    // Loads and caches RGB pool.
    const rgb_pool = generate(3, RGB_POOL_SIZE);

    const rgb_input = document.getElementById("rgb-input");
    const graph_input = document.getElementById("graph-input");
    const preview_container = document.querySelector(".preview-container");

    rgb_input.addEventListener("input", () => update_rgb_preview(rgb_input, preview_container, rgb_pool));
    graph_input.addEventListener("input", () => update_graph(graph_input, chart));

    update_rgb_preview(rgb_input, preview_container, rgb_pool);
    update_graph(graph_input, chart);
});