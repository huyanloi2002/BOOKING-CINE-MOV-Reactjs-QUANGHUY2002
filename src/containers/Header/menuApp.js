export const adminMenu = [
    { // quan ly nguoi dung
        name: 'menu.admin.manage',
        menus: [
            {
                name: 'menu.admin.admin-manage', link: '/system/admin-manage'
            },
            {
                name: 'menu.admin.staff-manage', link: '/system/staff-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.customer-manage', link: '/system/customer-manage'
            },
        ]
    },
    // { // quan ly rap phim
    //     name: 'menu.admin.cinema',
    //     menus: [
    //         {
    //             name: 'menu.admin.cinema-manage', link: '/system/cinema-manage'
    //         }

    //     ]
    // },
    // { // quan ly the loai
    //     name: 'menu.admin.genre',
    //     menus: [
    //         {
    //             name: 'menu.admin.genre-manage', link: '/system/genre-manage'
    //         }

    //     ]
    // },
    { // quan ly phim
        name: 'menu.admin.film',
        menus: [
            {
                name: 'menu.admin.film-manage', link: '/system/film-manage'
            }

        ]
    },
    { // quan ly phim dang chieu
        name: 'menu.admin.post-film',
        menus: [
            {
                name: 'menu.admin.post-now-showing-manage', link: '/system/post-now-showing-manage'
            }

        ]
    },
    { // quan ly tin tuc
        name: 'menu.admin.news',
        menus: [
            {
                name: 'menu.admin.news-manage', link: '/system/news-manage'
            }

        ]
    },
    { // quan ly banner
        name: 'menu.admin.banner',
        menus: [
            {
                name: 'menu.admin.banner-manage', link: '/system/banner-manage'
            }

        ]
    },

    { // quan ly thong tin phim
        name: 'menu.admin.information',
        menus: [
            {
                name: 'menu.admin.information-manage', link: '/system/information-manage'
            }

        ]
    }

];