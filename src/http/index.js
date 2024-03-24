import axios from "axios";

const $logs = axios.create({
    baseURL: 'http://80.78.255.223:80/anomaly_logs',
    headers: {
        'Content-Type': 'application/json',
    }
})

const $clusters = axios.create({
    baseURL: 'http://80.78.255.223:80/logs_clusters',
    headers: {
        'Content-Type': 'application/json',
    }
})

export {
    $logs,
    $clusters,
}
