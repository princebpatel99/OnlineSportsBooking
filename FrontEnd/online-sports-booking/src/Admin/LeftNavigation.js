import React from 'react';
import { SideNav, Chevron, Icon } from 'react-side-nav';
require('react-side-nav/dist/themes.css');

export default class LeftNavigation extends React.Component {

    constructor(props) {
        super(props);
        console.log("Constructor")

    }


    render() {
        const menuItems = [
            {
                id: 1,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
            {
                id: 2,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
            {
                id: 3,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
            {
                id: 4,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
            {
                id: 5,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
            {
                id: 6,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
            {
                id: 7,
                label: 'Item 1',
                icon: 'fas fa-battery-half',
                items: [
                    {
                        id: 11,
                        label: 'Item 1.1',
                        icon: 'fas fa-car',
                        link: '/item11',
                    },
                    {
                        id: 12,
                        label: 'Item 1.2',
                        icon: 'fas fa-bullhorn',
                        link: '/item12',
                    },
                ],
            },
        ];

        const NavLink = props => (<a href={props.to} {...props}><i className={`fa ${props.icon}`} />{props.label}</a>);
        return (
            <div style={{ width: '20%' }}>
                <SideNav
                    items={menuItems}
                    linkComponent={NavLink}
                    chevronComponent={Chevron}
                    iconComponent={Icon}
                />
            </div>
        );
    }
}
