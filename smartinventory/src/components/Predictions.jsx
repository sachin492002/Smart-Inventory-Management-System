import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {LineChart} from "@mui/x-charts/LineChart";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

export default function Predictions() {

    const [time, setTime] = useState(7)
    const [data, setData] = useState({dates: [], predictions: []});
    const [loading, setLoading] = useState(true);
    const handletime = (val) => {
        setTime(val)
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/predictions?day=${time}`)
            .then(response => {
                const formattedData = {
                    dates: response.data.dates.map(d => new Date(d)),
                    predictions: response.data.predictions,
                };
                setData(formattedData);
                setLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [time]);
    return (
        <>
            <Navbar/>
            <div className='flex flex-row justify-center items-center '>
                {loading ? (
                    <Loader/>
                ) : (
                    <>
                        <LineChart

                            title='This Weeks sales prediction'
                            xAxis={[
                                {
                                    label: "Date",
                                    data: data.dates,
                                    tickInterval: data.dates,
                                    scaleType: "time",
                                    valueFormatter: (date) => dayjs(date).format("MMM D"),
                                },
                            ]}
                            series={[
                                {
                                    data: data.predictions,
                                    showMark: ({index}) => index % 2 === 0,
                                },
                            ]}
                            width={800}
                            height={500}
                        />
                        <form className="max-w-sm mx-auto">
                            <label htmlFor="countries"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                an option</label>
                            <select id="countries" onChange={(e) => handletime(e.target.value)}
                                    className=" bg-amber-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected>Choose a time range</option>
                                <option value="7">Week</option>
                                <option value="30">Month</option>
                                <option value="365">Year</option>
                            </select>
                        </form>
                    </>
                )
                }

            </div>
        </>
    )
}