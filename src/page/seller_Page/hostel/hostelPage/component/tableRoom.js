import React, {useEffect, useState} from 'react';
import {tokens} from "../../../../../components/theme";
import {Box, Button, MenuItem, Select, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {CreateRoomAPI, DeleteRoomAPI, GetRoomsAPI, PostPhotoRoom, UpdateRoomAPI} from "../../API/hostelAPI";
import {Input, Modal, Popconfirm, message, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import './styleRoom.css'


const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};

const TableRoom = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [initialState, setInitialState] = useState()
    const [typeHotel, setTypeHotel] = React.useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [currentRoomID, setCurrentID] = useState()
    const [fileList, setFileList] = useState([])
    const [currentRoomIdForPhoto , setCurrentRoomIdForPhoto] = useState()


    const handleUpdate = (id) => {
        console.log(id + "update")
        setOpen(true)
        setCurrentID(id)
    }

    const handleDelete = (id) => {
        DeleteRoomAPI(id).then(r => {
            if (r === 200) {
                window.location.reload()
            }
        })
    }

    const handlePhoto = (file) => {

       PostPhotoRoom(currentRoomIdForPhoto , file.file.originFileObj)
    }

    const getPhotoRoom = () => {

    }

    const columns = [
        {field: "id", headerName: "ID"},
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "roomsNumber",
            headerName: "Rooms Number",
            type: "number",
            headerAlign: 'left',
            align: 'left',
            flex: 1
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
        },
        {
            field: 'photo',
            headerName: 'Photo',
            flex: 1,
            renderCell: ({row}) => {
                const photo = () => {
                    const {roomId} = row
                    setCurrentRoomIdForPhoto(roomId)
                    setOpenPhoto(true)
                }
                return (
                    <Box>
                        <Button
                            color="secondary"
                            variant="contained"
                            size={"large"}
                            onClick={photo}
                        >Photo</Button>
                    </Box>
                )
            }
        },
        {
            field: "action",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({row}) => {
                const handleButtonUpdate = () => {
                    const {roomId} = row;
                    handleUpdate(roomId);
                };
                const handleButtonDelete = () => {
                    const {roomId} = row;
                    handleDelete(roomId);
                };
                return (
                    <Box>
                        <Button
                            color="secondary"
                            variant="contained"
                            size={"large"}
                            onClick={handleButtonUpdate}
                        >Update</Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={handleButtonDelete}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                color="error"
                                variant="contained"
                                size={"large"}
                            >Delete</Button>
                        </Popconfirm>

                    </Box>
                );
            },
        },
    ];
    const handleSend = () => {
        setIsLoading(true)
        UpdateRoomAPI(initialState, currentRoomID).then(r => {
            if (r === 200) {
                setIsLoading(false)
                window.location.reload()
            }
        })
    }
    const handleChangeTypeHotel = (event) => {
        setInitialState({...initialState, type: event.target.value});
        setTypeHotel(event.target.value)
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    useEffect(() => {
        GetRoomsAPI().then((data) => {
            const roomsWithIds = data.map((room, index) => ({
                ...room,
                id: (index + 1).toString(),
                name: room.title,
                roomsNumber: room.rooms_number,
                type: room.type

            }));
            setRooms(roomsWithIds);
        });
    }, []);
    return (
        <div>
            <Box m="20px">
                <Modal
                    title={'Photo'}
                    centered
                    open={openPhoto}
                    onOk={() => setOpenPhoto(false)}
                    onCancel={() => setOpenPhoto(false)}
                    width={'50%'}
                    style={{background: "#191919"}}
                >

                    <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handlePhoto}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Modal>
                <Modal
                    title="Modal 1000px width"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={'50%'}
                    style={{background: "#191919"}}
                >
                    <Box display={'flex'}>
                        <Box width={"100%"}>
                            <div className="box-2-input">
                                <div className="input-2-row" style={{marginBottom: "15px"}}>
                                    <label htmlFor="Title">Title</label>
                                    <Input placeholder={'Title'}
                                           onChange={e => setInitialState({...initialState, title: e.target.value})}/>
                                </div>
                                <div className="input-2-row" style={{marginBottom: "15px"}}>
                                    <label htmlFor="price">Price</label>
                                    <Input placeholder={'price'} type={'number'}
                                           onChange={e => setInitialState({...initialState, price: e.target.value})}/>
                                </div>
                            </div>
                            <div className="input" style={{marginBottom: "15px"}}>
                                <label htmlFor="Floor">Floor</label>
                                <Input placeholder={'Floor'} type={'number'}
                                       onChange={e => setInitialState({...initialState, floor: e.target.value})}/>
                            </div>
                            <div className="input" style={{marginBottom: "15px"}}>
                                <label htmlFor="Type">Категории</label> <br/>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typeHotel}
                                    label="Type"
                                    onChange={handleChangeTypeHotel}
                                    style={{
                                        width: '100%',
                                        height: "35px",
                                        background: "white",
                                        color: "black",
                                        border: "#d9d9d9 solid 1px"
                                    }}
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
                                           onChange={e => setInitialState({...initialState, area: e.target.value})}
                                    />
                                </div>
                                <div className="input-2-row" style={{marginBottom: "15px"}}>
                                    <label htmlFor="RoomNumber">Room number</label>
                                    <Input placeholder={'Room number'} type={'number'}
                                           onChange={e => setInitialState({
                                               ...initialState,
                                               rooms_number: e.target.value
                                           })}
                                    />
                                </div>
                            </div>
                            <div className="box-2-input">
                                <div className="input-2-row" style={{marginBottom: "15px"}}>
                                    <label htmlFor="MinBookDay">Min book day</label>
                                    <Input placeholder={'Min book day'} type={'number'}
                                           onChange={e => setInitialState({
                                               ...initialState,
                                               minimum_book_days: e.target.value
                                           })}
                                    />
                                </div>
                                <div className="input-2-row" style={{marginBottom: "15px"}}>
                                    <label htmlFor="MaxBookDay">Max book day</label>
                                    <Input placeholder={'Max book day'} type={'number'}
                                           onChange={e => setInitialState({
                                               ...initialState,
                                               minimum_preorder_days: e.target.value
                                           })}
                                    />
                                </div>
                            </div>

                            {isLoading ? (
                                <Button type="submit"
                                        color="secondary"
                                        variant="contained"
                                        size={"large"}
                                        style={{width: "100%", background: "#4CCEAC"}}
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
                                    Update
                                </Button>
                            )}
                        </Box>

                    </Box>
                </Modal>
                <Box
                    m="40px 0 0 0"
                    height="50vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        style={{margin: '20px'}}
                        rows={rooms}
                        columns={columns}
                        getRowId={(row) => row.id} // Specify the unique identifier for each row
                    />

                </Box>
            </Box>
        </div>
    );
};

export default TableRoom;
