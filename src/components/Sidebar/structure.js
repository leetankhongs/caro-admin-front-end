import React from "react";
import {
    Home as HomeIcon,
    PeopleAlt as PeopleAltIcon,
    AvTimer as AvTimerIcon,
} from "@material-ui/icons";

const structure = [
    { id: 0, label: "Trang chủ", link: "/app/dashboard", icon: <HomeIcon /> },
    {
        id: 1,
        label: "Quản lý người dùng",
        link: "/app/users",
        icon: <PeopleAltIcon />,
    }, 
    {
        id: 2,
        label: "Lịch sử",
        link: "/app/histories",
        icon: <AvTimerIcon />,
    }
    // {
    //     id: 2,
    //     label: "Đại học",
    //     link: "/app/universities/northern",
    //     icon: <SchoolIcon />,
    //     children: [
    //         { label: "Miền bắc", link: "/app/universities/northern" },
    //         { label: "Miền trung", link: "/app/universities/central" },
    //         { label: "Miền nam", link: "/app/universities/southern" },
    //     ],
    // },
    // { id: 3, label: "Lấy dữ liệu", link: "/app/crawl-data", icon: <GetAppIcon /> },

    // { id: 4, label: "Báo cáo", link: "/app/reports", icon: <ReportIcon /> },
    // {
    //     id: 5,
    //     label: "Top ngành",
    //     link: "/app/top-industries",
    //     icon: <WorkIcon />,
    // },
    // {
    //     id: 6,
    //     label: "Cài đặt khác",
    //     link: "/app/other-setting",
    //     icon: <SettingsIcon />,
    // },

];

export default structure;