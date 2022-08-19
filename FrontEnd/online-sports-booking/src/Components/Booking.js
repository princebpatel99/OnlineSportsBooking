import React from 'react';
import LeftNavigation from '../Components/LeftNavigation';
import CalendarPage from '../User/Calendar';

export default class Booking extends React.Component {

    constructor(props) {
        super(props);
        console.log("Constructor")

    }


    render() {
        return (
            <>
                <div className='main-content'>
                    <LeftNavigation />
                    <div id="page-wrapper">
                        <div className='main-page general' style={{marginLeft:'45px'}}>

                            <CalendarPage />
                        </div>

                    </div>
                </div>


            </>
        );
    }
}
