import React, {useEffect, useState} from 'react';
import {GetAllPlaces, UpdatePlace} from "../API/placeAdminAPI";
import style from '../placeAdmin.module.css';
import {Button, Input, message, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";

const ContentPlace = (props) => {
    const [data, setData] = useState([]);
    const {selectPlace, setSelectPlace} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [files, setFiles] = useState([])
    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClickItem = (item) => {
        setSelectPlace(item);
    };
    const sendUpdate = () => {
        if (selectedItem) {
            UpdatePlace(selectedItem, selectedItem.id).then(r => {
                if (r?.status === 200) {
                    message.success('updated')
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }
    useEffect(() => {
        GetAllPlaces().then(r => {
            if (r?.status === 200) {
                setData(r.data);
            }
        });
    }, []);

             return (
        <div className={style.contentPlace}>
            {data && data.map((item) => (
                <div key={item.id}
                     className={style.contentPlaceItem}
                     onClick={() => handleClickItem(item)}>
                    <p>title: {item?.title}</p>
                    <p>address: {item?.address}</p>
                    <Button onClick={() => showModal(item)}>Update</Button>
                </div>
            ))}
            <Modal title="Update" open={isModalOpen} onCancel={handleCancel}>
                {selectedItem && (
                    <div>
                        <Input value={selectedItem.title}
                               onChange={(e) => setSelectedItem({...selectedItem, title: e.target.value})}
                        />
                        <TextArea
                            style={{
                                marginTop: '10px'
                            }}
                            value={selectedItem?.info}
                            onChange={(e) => setSelectedItem({...selectedItem, info: e.target.value})}
                            placeholder="info"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />

                        <input type="file" multiple onChange={e=>{setFiles(...files , e)}}/>

                        <Button onClick={sendUpdate}>Update</Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ContentPlace;
