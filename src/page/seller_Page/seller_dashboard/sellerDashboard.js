import React, {useEffect, useState} from 'react';
import container from '../../../components/appLayout/AppLayout.module.css';
import style from './sellerDashboard.module.css'
import {Icons} from "../../../assets/icons/icons";
import CardStatsWithAreaChart from "../../../components/card-stats-with-area-chart/CardStatsWithAreaChart";
import Footer from "../../../components/footer/footer";
import Seller_new_requests from "./component/requests/seller_new_requests";
import Seller_active_requests from "./component/requests/seller_active_requests";
import Seller_story_requests from "./component/requests/seller_story_requests";
import SellerDashboard_cotteg from "./component/cotteg_and_hotels/sellerDashboard_cotteg";
import SellerDashboard_hotels from "./component/cotteg_and_hotels/sellerDashboard_hotels";

const SellerDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeTabCottage_Hotels, setActiveTabCottage_Hotels] = useState(0);


    function handleClickTab(value) {
        setActiveTab(value);
    }
    function handleClickTabCottage_Hotels(value) {
        setActiveTabCottage_Hotels(value);
    }

    return (
        <>
            <div className={container.container} style={{marginTop: '50px'}}>
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
                <div className={style.sellerDashboard__stats}>
                    <CardStatsWithAreaChart
                        stats='24'
                        chartColor='primary'
                        avatarColor='success'
                        title='Общее колличество заявок'
                        avatarIcon='tabler:credit-card'
                        chartSeries={[{data: [100, 35, 25, 61, 32, 84, 70]}]}
                        style={{
                            width: '384px',
                            height: "200px",
                            borderRadius: "15px",
                            boxShadow: ' 0px 0px 5px 0px rgba(0,0,0,0.2)'
                        }}
                    />
                    <CardStatsWithAreaChart
                        stats='120'
                        chartColor='primary'
                        avatarColor='success'
                        title='Количество успешных сделок'
                        avatarIcon='tabler:credit-card'
                        chartSeries={[{data: [100, 35, 25, 61, 32, 84, 70]}]}
                        style={{
                            width: '384px',
                            height: "200px",
                            borderRadius: "15px",
                            boxShadow: ' 0px 0px 5px 0px rgba(0,0,0,0.2)'
                        }}
                    />
                    <CardStatsWithAreaChart
                        stats='120'
                        chartColor='primary'
                        avatarColor='success'
                        title='Количество отменённых сделок'
                        avatarIcon='tabler:credit-card'
                        chartSeries={[{data: [100, 35, 25, 61, 32, 84, 70]}]}
                        style={{
                            width: '384px',
                            height: "200px",
                            borderRadius: "15px",
                            boxShadow: ' 0px 0px 5px 0px rgba(0,0,0,0.2)'
                        }}
                    />
                </div>
                <div className={style.sellerDashboard__stats} style={{marginTop: 0}}>
                    <CardStatsWithAreaChart
                        stats='5'
                        chartColor='primary'
                        avatarColor='success'
                        title='Количество преждевременных выселений'
                        avatarIcon='tabler:credit-card'
                        chartSeries={[{data: [100, 35, 25, 61, 32, 84, 70]}]}
                        style={{
                            width: '384px',
                            height: "200px",
                            borderRadius: "15px",
                            boxShadow: ' 0px 0px 5px 0px rgba(0,0,0,0.2)'
                        }}
                    />
                    <CardStatsWithAreaChart
                        stats='1.300.000 Сум'
                        chartColor='primary'
                        avatarColor='success'
                        title='Общий доход'
                        avatarIcon='tabler:credit-card'
                        chartSeries={[{data: [100, 35, 25, 61, 32, 84, 70]}]}
                        style={{
                            width: '384px',
                            height: "200px",
                            borderRadius: "15px",
                            boxShadow: ' 0px 0px 5px 0px rgba(0,0,0,0.2)',

                        }}
                    />
                </div>

                <div className={style.sellerDashboard__stats__requests}>
                    <div className={style.sellerDashboard__stats__requests__tabs}>
                        <div className={`${style["sellerDashboard__stats__requests__tabs_button"]} ${
                            activeTab === 0 && style["active"]
                        }`}
                             onClick={() => handleClickTab(0)}
                        >
                            {activeTab === 0 ? <Icons.Seller_dashboard_request_tab style={{marginRight: '10px'}}/> :
                                <Icons.Seller_dashboard_request_tab_disbl style={{marginRight: '10px'}}/>
                            }

                            Новые
                        </div>
                        <div className={`${style["sellerDashboard__stats__requests__tabs_button"]} ${
                            activeTab === 1 && style["active"]
                        }`}
                             onClick={() => handleClickTab(1)}
                        >
                            {activeTab === 1 ? <Icons.Seller_dashboard_request_tab style={{marginRight: '10px'}}/> :
                                <Icons.Seller_dashboard_request_tab_disbl style={{marginRight: '10px'}}/>
                            }
                            Активные
                        </div>
                        <div className={`${style["sellerDashboard__stats__requests__tabs_button"]} ${
                            activeTab === 2 && style["active"]
                        }`}
                             onClick={() => handleClickTab(2)}>

                            {activeTab === 2 ? <Icons.Seller_dashboard_request_tab style={{marginRight: '10px'}}/> :
                                <Icons.Seller_dashboard_request_tab_disbl style={{marginRight: '10px'}}/>
                            }
                            История
                        </div>
                    </div>

                    <div className={style.sellerDashboard__stats__requests__content}>
                        {activeTab === 0 && <Seller_new_requests/>}
                        {activeTab === 1 && <Seller_active_requests/>}
                        {activeTab === 2 && <Seller_story_requests/>}
                    </div>
                </div>

                <div className={style.sellerDashboard__stats__cotteg_hotels} style={{justifyContent:"center"}}>
                    <div className={style.sellerDashboard__stats__requests__tabs}>
                        <div className={`${style["sellerDashboard__stats__requests__tabs_button_cotteg_hotel"]} ${
                            activeTabCottage_Hotels === 0 && style["active"]
                        }`}
                             onClick={() => handleClickTabCottage_Hotels(0)}
                             style={{width:'50%'}}
                        >
                            {activeTabCottage_Hotels === 0 ? <Icons.Seller_dashboard_request_tab style={{marginRight: '10px'}}/> :
                                <Icons.Seller_dashboard_request_tab_disbl style={{marginRight: '10px'}}/>
                            }

                            Дачи/Дома
                        </div>
                        <div className={`${style["sellerDashboard__stats__requests__tabs_button_cotteg_hotel"]} ${
                            activeTabCottage_Hotels === 1 && style["active"]
                        }`}
                             onClick={() => handleClickTabCottage_Hotels(1)}
                             style={{width:'50%'}}
                        >
                            {activeTabCottage_Hotels === 1 ? <Icons.Seller_dashboard_request_tab style={{marginRight: '10px'}}/> :
                                <Icons.Seller_dashboard_request_tab_disbl style={{marginRight: '10px'}}/>
                            }
                            Отели
                        </div>
                    </div>
                    <div className={style.sellerDashboard__stats__requests__content}>
                        {activeTabCottage_Hotels === 0 && <SellerDashboard_cotteg/>}
                        {activeTabCottage_Hotels === 1 && <SellerDashboard_hotels/>}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SellerDashboard;
