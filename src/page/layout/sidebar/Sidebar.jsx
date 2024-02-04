import {useEffect, useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {tokens} from "../../../components/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import {
    ANNOUNCEMENT,
    CABINET,
    CREATE_ANNOUNCEMENT, HOSTEL,
    PROFILE, SCHEDULE,
    UPDATE_ANNOUNCEMENT
} from "../../../processes/utils/consts";
import PersonIcon from '@mui/icons-material/Person';
import GiteIcon from '@mui/icons-material/Gite';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {$authHost} from "../../../processes/http/http";
import {jwtDecode} from "jwt-decode";

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = ({user}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [imgProfile, setImgProfile] = useState()

    const getPhoto = async () => {
        const JWT = jwtDecode(localStorage.getItem('token'))
        try {
            const res = await $authHost.get(`/media/users/${JWT.userId}/`, {responseType: 'arraybuffer'});
            // Convert the binary data to a base64 string
            const base64 = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            // Create a data URL
            const dataUrl = `data:${res.headers['content-type'].toLowerCase()};base64,${base64}`;
            setImgProfile(dataUrl);
        } catch (e) {
            console.log(e);
        }
    };
useEffect(()=>{
    getPhoto()
},[])
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    {user?.role}
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {imgProfile ? (<img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={imgProfile}
                                    style={{cursor: "pointer", borderRadius: "50%", objectFit: "cover"}}
                                />) : (<h1>{user?.role} Photo</h1>)}

                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{m: "10px 0 0 0"}}
                                >
                                    {user?.username}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>


                        {user?.role === 'user' && (
                            <Item
                                title="Profile"
                                to={CABINET + PROFILE}
                                icon={<PersonIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {user?.role === 'admin' && (
                            <Item
                                title="Profile"
                                to={CABINET + PROFILE}
                                icon={<PersonIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {user?.role === 'moderate' && (
                            <Item
                                title="Profile"
                                to={CABINET + PROFILE}
                                icon={<PersonIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {user?.role === 'seller' && (<>
                                <Item
                                    title="Profile"
                                    to={CABINET + PROFILE}
                                    icon={<PersonIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Typography variant="h6"
                                            color={colors.grey[300]}
                                            sx={{m: "15px 0 5px 20px"}}>
                                    Hostel
                                </Typography>
                                <Item
                                    title="Hostel"
                                    to={CABINET + HOSTEL}
                                    icon={<GiteIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />



                                <Typography variant="h6"
                                            color={colors.grey[300]}
                                            sx={{m: "15px 0 5px 20px"}}>
                                    Schedule
                                </Typography>
                                <Item
                                    title="Schedule"
                                    to={CABINET + SCHEDULE}
                                    icon={<CalendarMonthIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Typography variant="h6"
                                            color={colors.grey[300]}
                                            sx={{m: "15px 0 5px 20px"}}>
                                    Calendar
                                </Typography>
                                <Item
                                    title="Announcement"
                                    to={CABINET + ANNOUNCEMENT}
                                    icon={<CalendarMonthIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Create"
                                    to={CABINET + CREATE_ANNOUNCEMENT}
                                    icon={<EditCalendarIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Update"
                                    to={CABINET + UPDATE_ANNOUNCEMENT}
                                    icon={<EventRepeatIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>

                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
