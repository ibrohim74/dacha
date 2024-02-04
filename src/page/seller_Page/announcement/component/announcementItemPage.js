import React, {useEffect, useState} from 'react';
import {CreateAnnouncementAPI, DeleteDachaAPI, GetDachaAPI, UpdateDachaAPI} from '../API/announcementAPI';
import {useParams} from 'react-router-dom';
import {Box, Button, List, ListItem, ListItemText, Typography, useTheme} from '@mui/material';
import {tokens} from '../../../../components/theme';
import {formatDate} from '@fullcalendar/core';
import HeaderAdminPage from '../../../../components/header_adminPage';
import Calendar from './calendar';
import {Input, message, Modal, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {LoadingOutlined} from '@ant-design/icons';
import MapsAnnouncement from './mapsAnnouncement';
import AnnItemAddPhoto from "./annItemAddPhoto";
import {ANNOUNCEMENT, CABINET} from "../../../../processes/utils/consts";

const AnnouncementItemPage = () => {
    const [dachaData, setDachaData] = useState();
    const [open, setOpen] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [initialState, setInitialState] = useState({
        display_name: null,
        latitude: null,
        longitude: null,
        type: 'UZS',
        title: '',
        price: '',
        info: '',
        area: '',
        floors: '',
        minimum_book_days: '',
        minimum_preorder_days: '',
        rooms_number: '',
    });
    const [typePrice, setTypePrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectPosition, setSelectPosition] = useState(null);
    const [events, setEvents] = useState([]);

    const {Option} = Select;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {id} = useParams();

    const updateInfoButton = () => {
        setOpen(current => !current)
    };
    const addPhotoButton = () => {
        setOpenPhoto(current => !current)
    };
    const handleSend = () => {
        if (initialState.title && initialState.info && initialState.price !== 0) {
            if (initialState.location_name) {
                if (initialState.floors &&
                    initialState.area && initialState.rooms_number
                    && initialState.minimum_book_days && initialState.minimum_preorder_days) {
                    UpdateDachaAPI(id,initialState).then(r => {
                        if (r?.status === 200) {
                            message.success('success')
                            window.location.reload()
                        } if (r?.response?.status === 401) {
                            localStorage.clear()
                            window.location.assign('/')
                        }
                    })
                } else {
                    message.error('barcha malumotlarni toldiring')
                }

            } else {
                message.error('qidiruv tugmasi orqali kerakli joyni qidirib tanlang')
            }
        } else {
            message.error('barcha malumotlarni toldiring')
        }
    };
    const handleDelete = () =>{
        DeleteDachaAPI(id).then(r => {
            if (r.status === 200){
                window.location.assign(CABINET+ANNOUNCEMENT)
            }
        })
    }
    const priceType = (val) => {
        setInitialState({...initialState, type: val});
    };

    const selectAfter = (
        <Select defaultValue={typePrice} onChange={priceType}>
            <Option value="UZS">UZS</Option>
            <Option value="Y.E">Y.E</Option>
        </Select>
    );

    useEffect(() => {
        GetDachaAPI(id).then((r) => {
            setDachaData(r);
            setTypePrice(r.type);
            setInitialState({
                title: r?.title,
                price: r?.price,
                info: r?.info,
                area: r?.area,
                floors: r?.floors,
                minimum_book_days: r?.minimum_book_days,
                minimum_preorder_days: r?.minimum_preorder_days,
                rooms_number: r?.rooms_number,
                type: r?.type
            });
            setSelectPosition({
                lat: r?.latitude,
                lon: r?.longitude,
                display_name: r?.location_name,
            });
        });
    }, [id]);

    useEffect(() => {
        setInitialState({
            ...initialState,
            location_name: selectPosition?.display_name,
            latitude: parseFloat(selectPosition?.lat),
            longitude: parseFloat(selectPosition?.lon),
        });
    }, [selectPosition]);
    return (
        <div>
            <Box m="20px">
                <HeaderAdminPage title={dachaData?.title} subtitle="Announcement calendar for seller"/>
                <Box display="flex">
                    <Button type={'button'} color="secondary" variant="contained" style={{marginBottom:'10px'}} onClick={updateInfoButton}>
                        Update info
                    </Button>
                    <Button type={'button'} color="secondary" variant="contained" style={{marginLeft: '20px' , marginBottom:'10px'}}
                    onClick={addPhotoButton}
                    >
                        Add Photo
                    </Button>
                </Box>

                {open && <Box display={'flex'} m={'20px 0'} width={"100%"}>
                    <Box width={'100%'} display={'flex'}>
                        <div className="ann-update-inputBox" style={{width:'48%'}}>
                            <div className="box-2-input">
                                <div className="input-2-row" style={{marginBottom: '15px'}}>
                                    <label htmlFor="Title">Укажите название*</label>
                                    <Input

                                        value={initialState?.title}
                                        onChange={(e) => setInitialState({...initialState, title: e.target.value})}
                                    />
                                </div>
                                <div className="input-2-row" style={{marginBottom: '15px'}}>
                                    <label htmlFor="price">цена*</label>
                                    <Input
                                        addonAfter={selectAfter}
                                        value={initialState?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                                        type={'text'}
                                        onChange={(e) => {
                                            const cleanedValue = e.target.value.replace(/\s/g, '');
                                            setInitialState({
                                                ...initialState,
                                                price: cleanedValue !== '' ? parseInt(cleanedValue) : 0,
                                            });
                                        }}
                                        onBlur={() => {
                                            if (!initialState.price || isNaN(initialState.price)) {
                                                setInitialState({
                                                    ...initialState,
                                                    price: 0,
                                                });
                                            }
                                        }}
                                    />


                                </div>
                            </div>
                            <div className="input">
                                <label htmlFor="name">Описание*</label>
                                <TextArea
                                    value={initialState?.info}
                                    onChange={(e) => setInitialState({...initialState, info: e.target.value})}
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                />
                            </div>

                            <div className="box-2-input">
                                <div className="input-2-row" style={{marginBottom: '15px'}}>
                                    <label htmlFor="Title">Площадь</label>
                                    <Input
                                        value={initialState?.area}
                                        onChange={(e) => setInitialState({...initialState, area: e.target.value})}
                                    />
                                </div>
                                <div className="input-2-row" style={{marginBottom: '15px'}}>
                                    <label htmlFor="price">Этажность</label>
                                    <Input
                                        value={initialState?.floors}
                                        type={'number'}
                                        onChange={(e) => setInitialState({...initialState, floors: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="box-2-input">
                                <div className="input-2-row" style={{marginBottom: '15px'}}>
                                    <label htmlFor="Title">minimum_book_days</label>
                                    <Input
                                        value={initialState?.minimum_book_days}
                                        onChange={(e) => setInitialState({
                                            ...initialState,
                                            minimum_book_days: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="input-2-row" style={{marginBottom: '15px'}}>
                                    <label htmlFor="price">minimum_preorder_days</label>
                                    <Input
                                        value={initialState?.minimum_preorder_days}
                                        type={'number'}
                                        onChange={(e) => setInitialState({
                                            ...initialState,
                                            minimum_preorder_days: e.target.value
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="input">
                                <label htmlFor="price">количество комнат</label>
                                <Input
                                    value={initialState?.rooms_number}
                                    type={'number'}
                                    onChange={(e) => setInitialState({...initialState, rooms_number: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="ann-update-mapBox" style={{width:'48%' , marginLeft:'30px'}}>
                            <MapsAnnouncement setSelectPosition={setSelectPosition} selectPosition={selectPosition}/>
                            {isLoading ? (
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    size={'large'}
                                    style={{width: '100%', background: '#4CCEAC'}}
                                    disabled={true}
                                >
                                    <LoadingOutlined/>
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    size={'large'}
                                    style={{width: '100%'}}
                                    onClick={handleSend}
                                >
                                    Update
                                </Button>
                            )}
                            {isLoading ? (
                                <Button
                                    type="submit"
                                    color="error"
                                    variant="contained"
                                    size={'large'}
                                    style={{width: '100%',marginTop:'10px'}}
                                    disabled={true}
                                >
                                    <LoadingOutlined/>
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    color={'error'}
                                    variant="contained"
                                    size={'large'}
                                    style={{width: '100%',marginTop:'10px'}}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            )}
                        </div>

                    </Box>
                </Box>}
                {openPhoto && <AnnItemAddPhoto dachaId={id} dacha={dachaData} open={openPhoto}/>}


                <Box display="flex" justifyContent="space-between">
                    {/* CALENDAR SIDEBAR */}
                    <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
                        <Typography variant="h5">Events</Typography>
                        <List>
                            {events &&
                                events.map((event) => (
                                    <ListItem
                                        key={event.id}
                                        sx={{
                                            backgroundColor: colors.greenAccent[500],
                                            margin: '10px 0',
                                            borderRadius: '2px',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <ListItemText
                                            primary={event.inputData.title}
                                            secondary={
                                                <Typography>
                                                    start: {formatDate(event.start, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} <br/>
                                                    end: {formatDate(event.end, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                                </Typography>
                                            }
                                        />

                                    </ListItem>
                                ))}
                        </List>
                    </Box>

                    {/* CALENDAR */}
                    <Box flex="1 1 100%" ml="15px">
                        <Calendar/>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default AnnouncementItemPage;

