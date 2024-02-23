import React, {useEffect, useState} from 'react';
import {Box, Button, MenuItem, Select, Typography} from "@mui/material";
import {Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header_adminPage from "../../../../../components/header_adminPage";
import {jwtDecode} from "jwt-decode";
import {$authHost} from "../../../../../processes/http/http";
import {CreateRoomAPI, GetHostelsAPI} from "../../API/hostelAPI";
import {HOSTEL} from "../../../../../processes/utils/consts";
import {LoadingOutlined} from "@ant-design/icons";
import './styleRoom.css'
const CreateRoom = () => {
    const [typeHotel, setTypeHotel] = React.useState('');
    const [initialState, setInitialState] = useState({price:0})
    const [isLoading, setIsLoading] = useState(false)
    const mediaQuery = useMediaQuery('(max-width:750px)');

    const handleSend = () => {
        setIsLoading(true)
        if (initialState.title && initialState.price && initialState.floor
            && initialState.info && initialState.area && initialState.type && initialState.rooms_number
            && initialState.minimum_book_days && initialState.minimum_preorder_days
        ){
            CreateRoomAPI(initialState).then(r => {
                console.log(r)
                if (r === 200) {
                    setIsLoading(false)
                    // window.location.assign(HOSTEL)
                }else {
                    setIsLoading(false)
                    message.error('error')}
            })
        }else {
            message.error('barcha malumotlarni toldiring')
            setIsLoading(false)
        }

    }

    const handleChange = (event) => {
        setInitialState({...initialState, type: event.target.value});
        setTypeHotel(event.target.value)
    };
    useEffect(() => {
        GetHostelsAPI().then(r => {
            r.map((item) => {
                setInitialState({...initialState, hotel_id: item.id})
            })
        })
    }, [])
    console.log(initialState)
    return (
        <Box m={'20px'}>
            <Header_adminPage title={"Room"}/>
            <Box display={'flex'}>
                <Box width={mediaQuery ? "90%" : "50%"}>
                    <div className="box-2-input">
                        <div className="input-2-row" style={{marginBottom: "15px"}}>
                            <label htmlFor="Title">Title</label>
                            <Input placeholder={'Title'}
                                   onChange={e => setInitialState({...initialState, title: e.target.value})}/>
                        </div>
                        <div className="input-2-row" style={{marginBottom: "15px"}}>
                            <label htmlFor="price">Price</label>
                            <Input placeholder={'price'}
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
                                       if (!initialState?.price || isNaN(initialState.price)) {
                                           setInitialState({
                                               ...initialState,
                                               price: 0,
                                           });
                                       }
                                   }}
                            />
                        </div>
                    </div>
                    <div className="input" style={{marginBottom: "15px"}}>
                        <label htmlFor="Floor">Floor</label>
                        <Input placeholder={'Floor'} type={'number'}
                               onChange={e => setInitialState({...initialState, floor: parseInt(e.target.value) })}/>
                    </div>
                    <div className="input" style={{marginBottom: "15px"}}>
                        <label htmlFor="Type">Категории</label> <br/>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeHotel}
                            label="Type"
                            onChange={handleChange}
                            style={{width: '100%', height: "35px", background: "white", color: "black", border: "none"}}
                        >
                            <MenuItem value={"standard"}>Стандарт</MenuItem>
                            <MenuItem value={'comfort'}>Комфорт</MenuItem>
                            <MenuItem value={'lux'}>Люкс</MenuItem>
                        </Select>
                    </div>
                    <div className="input" style={{marginBottom: "15px"}}>
                        <label htmlFor="Info">Info</label>
                        <TextArea placeholder={'Info'}
                                  onChange={e => setInitialState({...initialState, info: e.target.value})}
                                  autoSize={{
                                      minRows: 3,
                                      maxRows: 5,
                                  }}/>
                    </div>
                    <div className="box-2-input">
                        <div className="input-2-row" style={{marginBottom: "15px"}}>
                            <label htmlFor="Area">Area</label>
                            <Input placeholder={'Area'} type={'number'}
                                   onChange={e => setInitialState({...initialState, area: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="input-2-row" style={{marginBottom: "15px"}}>
                            <label htmlFor="RoomNumber">Room number</label>
                            <Input placeholder={'Room number'} type={'number'}
                                   onChange={e => setInitialState({...initialState, rooms_number: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="box-2-input">
                        <div className="input-2-row" style={{marginBottom: "15px"}}>
                            <label htmlFor="MinBookDay">Min book day</label>
                            <Input placeholder={'Min book day'} type={'number'}
                                   onChange={e => setInitialState({...initialState, minimum_book_days:parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="input-2-row" style={{marginBottom: "15px"}}>
                            <label htmlFor="MaxBookDay">Max book day</label>
                            <Input placeholder={'Max book day'} type={'number'}
                                   onChange={e => setInitialState({
                                       ...initialState,
                                       minimum_preorder_days:parseInt(e.target.value)
                                   })}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <Button type="submit"
                                color="secondary"
                                variant="contained"
                                size={"large"}
                                style={{width: "100%"}}
                                disabled={true}
                        >
                            <LoadingOutlined/>
                        </Button>
                    ) : (
                        <Button type="submit"
                                color="secondary"
                                variant="contained"
                                size={"large"}
                                style={{width: "100%"}}
                                onClick={handleSend}
                        >
                            Create
                        </Button>
                    )}
                </Box>

            </Box>
        </Box>

    );
};

export default CreateRoom;