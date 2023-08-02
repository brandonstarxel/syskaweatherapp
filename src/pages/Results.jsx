import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Button from 'react-bootstrap/Button';

function Results(props) {
    const { state } = useLocation();

    const [loading, setLoading] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState(null);

    const baseURL = 'http://31.54.182.90:25565';
    // const baseURL = 'http://localhost:105';

    useEffect(() => {
        // Function to initiate the POST call and get the task ID
        const initiateTask = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseURL}/task_compute`, {
                    method: 'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(state)
                });
                const result = await response.json();
                console.log('Task initiated:', result);
                setTaskId(result['task_id']);
            } catch (error) {
                console.error('Error initiating task:', error);
            }
        };

        initiateTask();
    }, []);

    useEffect(() => {
        // Function to check the progress of the task
        const checkProgress = async () => {
            if (taskId) {
                try {
                    const response = await fetch(`${baseURL}/task_status/${taskId}`);
                    const result = await response.json();
                    setProgress(result.progress*100);
                    if (result.progress === 1) {
                        // Task is complete, trigger download
                        setLoading(false);
                        previewDownload();
                    } else {
                        // Task is not complete, check progress again after a delay
                        setTimeout(checkProgress, 2000); // Adjust the delay time as needed
                    }
                } catch (error) {
                    console.error('Error checking task progress:', error);
                }
            }
        };

        checkProgress();
    }, [taskId]);

    const previewDownload = async () => {
        try {
            const response = await fetch(`${baseURL}/task_preview/${taskId}`);
            const result = await response.json();
            setData(JSON.parse(result['result']));
        } catch (error) {
            console.error('Error downloading data:', error);
        }
    };

    const triggerDownload = async () => {
        try {
            fetch(`${baseURL}/task_download/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    // Create blob link to download
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        `HourlyTemperatureData.csv`,
                    );

                    // Append to html link element page
                    document.body.appendChild(link);

                    // Start download
                    link.click();

                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                });
        } catch (error) {
            console.error('Error downloading data:', error);
        }
    };

    return (
        <div>
            <h1>Results</h1>
            <ProgressBar animated now={progress} style={{ width: "40%", margin: "auto" }} />
            {data &&
                <div style={{ display: "flex", minHeight: "50vh", justifyContent: "center", alignItems: "center", }}>
                    <ScatterChart
                        width={730}
                        height={400}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 10,
                            left: 10,
                        }}

                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" type="number" name="Day" unit="d" />
                        <YAxis dataKey="y" type="number" name="Temperature" unit="°C" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Hourly Temperatures" data={data} fill="#8884d8" />
                    </ScatterChart>
                </div>}
            {!loading &&
                <Button variant="primary" type="submit" style={{ marginBottom: 15, width: 150 }} onClick={triggerDownload}>
                    Download
                </Button>}
        </div>
    );
}

export default Results;