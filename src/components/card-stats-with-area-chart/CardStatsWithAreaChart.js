// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
// import Icon from 'src/@core/components/icon'
// import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'react-apexcharts'
import useMediaQuery from "@mui/material/useMediaQuery";

const CardStatsWithAreaChart = props => {
  const mediaQuery = useMediaQuery('(max-width:750px)');

  // ** Props
  const {
    sx,
    stats,
    title,
    avatarIcon,
    chartSeries,
    avatarSize = 42,
    chartColor = 'primary',
    avatarColor = 'primary',
    avatarIconSize = '1.625rem'
  } = props

  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 2.5,
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        top: 2,
        bottom: 17
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0,
        opacityFrom: 1,
        shadeIntensity: 1,
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.4,
              color: theme.palette[chartColor].main
            },
            {
              offset: 100,
              opacity: 0.1,
              color: theme.palette.background.paper
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette[chartColor].main
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false }
  }

  return (
    <Card sx={{ ...sx }} style={mediaQuery ? {width:'350px' } : props.style}>
      <ReactApexcharts type='area' height={'60%'} options={options} series={chartSeries} />
      <CardContent sx={{  display: 'flex', flexDirection: 'column', alignItems: 'flex-start'  }} style={{padding:'20px'}}>
        {/*<CustomAvatar skin='light' color={avatarColor} sx={{ mb: 2.5, width: avatarSize, height: avatarSize }}>*/}
        {/*  /!*<Icon icon={avatarIcon} fontSize={avatarIconSize} />*!/*/}
        {/*</CustomAvatar>*/}
        <Typography variant='body2' style={{color:"#A6A6A6", fontFamily:"Montserrat"}}>{title}</Typography>
        <Typography variant='h6' style={{fontFamily:"Montserrat" , fontWeight:600 }}>{stats}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsWithAreaChart
