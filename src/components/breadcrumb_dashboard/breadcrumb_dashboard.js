import React from 'react';
import container from '../appLayout/AppLayout.module.css'
import {Breadcrumb} from "antd";
import {DashboardOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Seller} from "../../processes/utils/Routes";

const Breadcrumb_dashboard = () => {
    const url = window.location.href;
    const urlParts = url.split('/');
    const homeIcon = <HomeOutlined />;
    const userIcon = <UserOutlined />;
    const currentPath = urlParts[urlParts.length - 1];
    const domainAndPort = urlParts.slice(0, 3).join('/');

    return (
        <div className={container.container}>
            {Seller.map((item, index) => {
                if (item.path === currentPath) {
                    return (
                        <Breadcrumb
                            key={index} // Assign a unique key prop based on index
                            items={[
                                {
                                    key: 'home',
                                    href: '/',
                                    title: homeIcon,
                                },
                                {
                                    key: 'user',
                                    href: item.path,
                                    title: (
                                        <>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default Breadcrumb_dashboard;
