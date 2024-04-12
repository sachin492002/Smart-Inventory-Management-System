import Loader from "./Loader";
import {LineChart} from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Home() {
    const [message, setMessage] = useState('');
    const [data, setData] = useState({dates: [], predictions: []});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/predictions?day=7')
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
        axios.get('https://api.thingspeak.com/channels/2436179/fields/2.json?api_key=NDLYALYZ2NPX5H0B&results=1').then(
            res => {
                setMessage(res.data.feeds[0].field2)
            }
        ).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <Navbar/>
            <h1 className='text-center text-6xl font-bold text-amber-400'>Smart Inventory</h1>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <div className='flex flex-row justify-center items-center min-h-full w-full  gap-4'>
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
                            width={500}
                            height={300}
                        />
                        <div
                            className='flex flex-row justify-center items-center gap-4 border-2 border-amber-400 rounded-lg'>
                            <span className='text-amber-400'> Current Products  </span>
                            <div className='w-24 h-24 bg-amber-200 flex justify-center items-center'>

                                <span className='text-3xl text-center'>{message} </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}