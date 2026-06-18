'use strict';

import Chart from 'chart.js/auto';
import { quasiRandom, sampleUnique } from '@unknownmonke/quasi-random';

const MAX_RGB = 100;
const MAX_GRAPH = 1000;

const RGB_POOL_SIZE = 10000; // Number of points to pre-generate in the value pool.

// -------------------------------------------------------- //
//                      RGB generation                      //
// -------------------------------------------------------- //

/**
 * Validates input value between [0, max].
 * Values outside of this range are set to the closest boundary value.
 */
function validateInput(value, max) {
    const number = Number.parseInt(value, 10);

    if (!Number.isInteger(number) || number < 0) {
        return 0;
    }
    return Math.min(number, max);
}

function toRgb(list) {
    return list.map(values => values.map(val => Math.round(val * 255)));
}

function updateRgbPreview(input, container, pool) {
    const n = validateInput(input.value, MAX_RGB);
    input.value = n;

    const colors = toRgb(sampleUnique(pool, n));

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

function updateGraph(input, chart) {
    const n = validateInput(input.value, MAX_GRAPH);
    input.value = n;

    const points = quasiRandom(2, n).map(([x, y]) => ({ x, y }));

    chart.data.datasets[0].data = points;
    chart.update();
}

// -------------------------------------------------------- //
//                        DOM actions                       //
// -------------------------------------------------------- //

document.addEventListener('DOMContentLoaded', () => {

    // Loads and caches RGB pool.
    const rgbPool = quasiRandom(3, RGB_POOL_SIZE);

    const rgbInput = document.getElementById("rgb-input");
    const graphInput = document.getElementById("graph-input");
    const previewContainer = document.querySelector(".preview-container");

    rgbInput.addEventListener("input", () => updateRgbPreview(rgbInput, previewContainer, rgbPool));
    graphInput.addEventListener("input", () => updateGraph(graphInput, chart));

    updateRgbPreview(rgbInput, previewContainer, rgbPool);
    updateGraph(graphInput, chart);
});