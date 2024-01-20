// import React, { useEffect, useRef, useState } from "react";
// import GSTC from "gantt-schedule-timeline-calendar";
// import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
// import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
// import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
// import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";
// import "gantt-schedule-timeline-calendar/dist/style.css";
//
// const ScheduleSeller = () => {
//     const gstcContainerRef = useRef(null);
//     const [gstcInstance, setGstcInstance] = useState(null);
//
//     useEffect(() => {
//         const initializeGSTC = () => {
//             const config = {
//                 // Kalendarning asosiy sozlamalari
//                 licenseKey: "YOUR_LICENSE_KEY",
//                 plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
//                 list: {
//                     columns: {
//                         data: {
//                             [GSTC.api.GSTCID("id")]: {
//                                 id: GSTC.api.GSTCID("id"),
//                                 width: 60,
//                                 data: ({ row }) => GSTC.api.sourceID(row.id),
//                                 header: {
//                                     content: "ID",
//                                 },
//                             },
//                             [GSTC.api.GSTCID("label")]: {
//                                 id: GSTC.api.GSTCID("label"),
//                                 width: 200,
//                                 data: "label",
//                                 header: {
//                                     content: "Label",
//                                 },
//                             },
//                         },
//                     },
//                     // Kalendarning qatorlari (rows)
//                     rows: {
//                         "gstcid-1": {
//                             id: "gstcid-1",
//                             label: "Row 1"
//                         },
//                         "gstcid-2": {
//                             id: "gstcid-2",
//                             label: "Row 2"
//                         },
//                         // Qo'shimcha qatorlar qo'shishingiz mumkin
//                     },
//                 },
//                 chart: {
//                     // Kalendarning elementlari (items)
//                     items:  {
//                         "1": {
//                             id: "1",
//                             rowId: "gstcid-1",
//                             label: "Item 1",
//                             time: {
//                                 start: new Date().getTime(),
//                                 end: new Date().getTime() + 24 * 60 * 60 * 1000
//                             }
//                         },
//                         "2": {
//                             id: "2",
//                             rowId: "gstcid-2",
//                             label: "Item 2",
//                             time: {
//                                 start: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
//                                 end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000
//                             }
//                         },
//                         // Qo'shimcha elementlar qo'shishingiz mumkin
//                     },
//                 },
//             };
//
//             // Kalendarni yaratish
//             const gstcInstance = GSTC({
//                 element: gstcContainerRef.current,
//                 state: GSTC.api.stateFromConfig(config),
//             });
//
//             setGstcInstance(gstcInstance);
//         };
//
//         initializeGSTC();
//
//         return () => {
//             // Kalendarni bekor qilish
//             if (gstcInstance) {
//                 // ResizeObserver'ni bekor qilish
//                 const resizeObserver = gstcInstance.state.get("config.chart.resizeObserver");
//                 if (resizeObserver) {
//                     resizeObserver.disconnect();
//                 }
//
//                 // Kalendarni bekor qilish
//                 gstcInstance.destroy();
//                 setGstcInstance(null);
//             }
//         };
//     }, [gstcInstance]);
//
//     return <div ref={gstcContainerRef} style={{ height: "500px" }} />;
// };
//
// export default ScheduleSeller;
import React from 'react';

const ScheduleSeller = () => {
    return (
        <div>

        </div>
    );
};

export default ScheduleSeller;
// https://medium.com/bryntum/creating-a-gantt-chart-with-react-using-next-js-fc080ad8b938
// https://gantt-schedule-timeline-calendar.neuronet.io/documentation/configuration/templates/chart-calendar