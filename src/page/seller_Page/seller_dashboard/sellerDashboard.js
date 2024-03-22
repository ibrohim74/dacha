import React from 'react';
import container from '../../../components/appLayout/AppLayout.module.css';
import style from './sellerDashboard.module.css'
import { Icons } from "../../../assets/icons/icons";
import { LineChart } from '@mui/x-charts/LineChart';

const SellerDashboard = () => {
    return (
        <div className={container.container} style={{ marginTop: '50px' }}>
            <div className={style.titleDashboard}>
                <div className={style.titleDashboard__Left}>
                    <h1>Мои обьявления</h1>
                </div>
                <div className={style.titleDashboard__Right}>
                    <p>Вся ваша статистика а так же все проекты</p>
                    <div className={style.titleDashboard__Moderate}>
                        <Icons.Moderate/>
                        Чат с модераторами
                    </div>
                </div>
            </div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                    },
                ]}
                width={500}
                height={300}
            />
        </div>
    );
};

export default SellerDashboard;
