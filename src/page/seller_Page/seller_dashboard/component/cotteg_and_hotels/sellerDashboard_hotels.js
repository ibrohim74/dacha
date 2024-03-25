import React from 'react';
import style from "../requests/seller_dashboard_requests.module.css";
import {Icons} from "../../../../../assets/icons/icons";

const SellerDashboardHotels = () => {
    return (
        <div>
            <div className={style.SellerDashboardNoData}>
                <Icons.NoDocuments/>
                <p>На данный момент ничего нету</p>
            </div>
        </div>
    );
};

export default SellerDashboardHotels;