import { ChartsButton, ClosePopupButton } from '@/components/Buttons/buttons';
import Header from '@/components/Header/header';
import { H1Centered } from '@/components/Headings/Headings';
import { ChartContainer, HomePageMainContainer, StatsBarContainer } from '@/components/containers/containers';
import axios from 'axios';
import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend,  CategoryScale, LinearScale, BarElement,);

const Stats = (stats:any) => {
    console.log(stats.stats)
    const [activeBtn, setActiveBtn] = useState(0)
    const [circleView, setCircleView] = useState(true)
    const changeChartView = (e:any) => {
        console.log(e.target.id)
        if (e.target.id == '0') {
            setActiveBtn(0)
            setCircleView(true)
        }
        else {
            setActiveBtn(1)
            setCircleView(false)
        }
    }
    return (
        <HomePageMainContainer>
            <Header/>
            <H1Centered>Статистика</H1Centered>
            <StatsBarContainer>
                <ChartsButton id='0' className={activeBtn === 0 ? 'active' : 'unactive'} onClick={(e)=>changeChartView(e)}>Круговая</ChartsButton>
                <ChartsButton id='1' className={activeBtn === 1 ? 'active' : 'unactive'} onClick={(e)=>changeChartView(e)}>Столбчатая</ChartsButton>
            </StatsBarContainer>
            <ChartContainer>
                {circleView ? <Pie data={stats.pie}/> : <Bar data={stats.bar}/>}
            </ChartContainer>
            
        </HomePageMainContainer>
    );
};

export default Stats;

export const getStaticProps = async() => {
    const res = await axios.get('http://80.78.255.223:80/statistics')
    const stats = res.data.result
    const PieChartData = {
        labels: ['Аномальные логи', 'Обычные логи'],
        datasets: [
            {
                label: 'Количество',
                data: [parseInt(res.data.result.anomaly), parseInt(res.data.result['not anomaly']) ],
                backgroundColor: [
                    '#D9C38A',
                    '#B6410F',
                  ],
                  borderColor: [
                    '#D9C38A',
                    '#B6410F',
                    
                  ],
                  borderWidth: 1,
            }

        ],
        
    }
    const BarChartData = {
        labels: ['Кол-во логов'],
        datasets: [
            {
                label: 'Аномальные логи',
                data:  [parseInt(res.data.result.anomaly)],
                backgroundColor: ['#D9C38A','#B6410F']
            },
            {
                label: 'Обычные логи',
                data: [parseInt(res.data.result['not anomaly'])],
                backgroundColor: '#B6410F',
            }

        ],
    }
    return {
        props: {
            pie: PieChartData,
            bar: BarChartData
        }
    };
}