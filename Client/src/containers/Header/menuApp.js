export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.home-admin',
        menus: [

            {
                name: 'menu.admin.home-admin', link: '/system/home-admin'
            }
        ]
    },
    { //quản lý người dùng
        name: 'menu.admin.manage-admin',
        menus: [

            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            },
            {
                name: 'menu.admin.manage-member', link: '/system/manage-menber'
            }
        ]
    }
];


export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //quản lý kế hoạch khám bệnh bác sĩ

                name: 'menu.doctor.manage-shedule', link: '/doctor/manage-shedule'

            },
            { //quản lý kế hoạch bệnh nhân của bác sĩ

                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            },
        ]
    }


];