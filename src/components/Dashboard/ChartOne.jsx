import React, { useState } from 'react';
import Chart from "react-apexcharts";

const options = {
    legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
        fontFamily: 'Sora, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
        },
        toolbar: {
        show: false,
        },
    },
    responsive: [
        {
        breakpoint: 1024,
        options: {
            chart: {
            height: 300,
            },
        },
        },
        {
        breakpoint: 1366,
        options: {
            chart: {
            height: 350,
            },
        },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: 'straight',
    },
    grid: {
        xaxis: {
        lines: {
            show: true,
        },
        },
        yaxis: {
        lines: {
            show: true,
        },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: '#fff',
        strokeColors: ['#3056D3', '#80CAEE'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
        size: undefined,
        sizeOffset: 5,
        },
    },
    xaxis: {
        type: 'category',
        categories: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
        ],
        axisBorder: {
        show: false,
        },
        axisTicks: {
        show: false,
        },
    },
    yaxis: {
        title: {
        style: {
            fontSize: '0px',
        },
        },
        min: 0,
        max: 100,
    },
};

const ChartOne = () => {
    const [state, setState] = useState({
        series: [
        {
            name: 'Visitas año anterior',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
            name: 'Visitas actual',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
        ],
    });

    return (
        <div className="col-span-12 rounded-md border border-gray-50 bg-white p-8 pt-8 pb-5 shadow-xl sm:px-8 xl:col-span-8">
            <div className="flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                <div className="flex min-w-47.5">
                    <span className="inline-block mt-1 mr-2 flex items-center justify-center rounded-full border border-primary h-3 w-3">
                        <span className="inline-block h-3 w-3 rounded-full bg-[#3056D3]"></span>
                    </span>
                    <div className="w-full">
                        <p className="font-semibold text-[#3056D3]">Total visitas año anterior</p>
                        <p className="text-sm font-medium">2022</p>
                    </div>
                </div>
                <div className="flex min-w-47.5">
                    <span className="inline-block mt-1 mr-2 flex items-center justify-center rounded-full border border-secondary h-3 w-3">
                        <span className="inline-block h-3 w-3 rounded-full bg-[#80CAEE]"></span>
                    </span>
                    <div className="w-full">
                        <p className="font-semibold text-[#80CAEE]">Total visitas año actual</p>
                        <p className="text-sm font-medium">2023</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div id="chartOne" className="-ml-5">
            <Chart
                options={options}
                series={state.series}
                type="area"
                height={350}
            />
        </div>
        </div>
    </div>
    );
};

export default ChartOne;
