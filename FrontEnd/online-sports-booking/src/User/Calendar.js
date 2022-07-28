import React from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize';
// import Modal from 'react-modal';
import { FetchData } from '../RestAPI/database';
import PopUp from '../Components/PopUp';
require('react-big-calendar/lib/css/react-big-calendar.css');






const localizer = globalizeLocalizer(globalize)

export default class CalendarPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [
            ],
            isModalOpen:false,
            fromDate:new Date(),
            toDate:new Date(),
            ground: null,
            sports:null
        }
        this.getData = this.getData.bind(this);
    }

    async componentDidMount(){
        await this.getData();
    }

    async getData(){
        var x = await FetchData("/api/OSBSlotBook","GET")
        let arr = [];
        x.forEach((element,id)=>{
            arr.push({id: id,
                title: "Ground Name : "+element.GroundName,
                start: new Date(element.FromDate),
                end: new Date(element.ToDate),
                ...element
            },
                )
        })
        this.setState({events:arr});
    }

    formatDate(date,time){
        let temp = new Date(date);
        return temp.getDate() + "/"+ (temp.getMonth()+1) +"/"+ temp.getFullYear() + " "+time;
    }
    async bookSlot(){
        let fromDate = new Date(this.state.fromDate);
        let toDate = new Date(this.state.toDate)
        var body = {
            FromDate : fromDate,
            ToDate : toDate,
            FromTime : fromDate.getHours()+":"+fromDate.getMinutes(),
            ToTime : toDate.getHours()+":"+toDate.getMinutes(),
            GroundName : this.state.ground,
            Sports : this.state.sports,
            Status : "Active",
            BookBy : "Self",
            isTournament : false,
            tournamentID : "",
            totalPeople : ""
        }
        var x = await FetchData("/api/OSBSlotBook","POST",body);
        if(x.isSuccess){
            await this.getData();
        }
        else{
            alert(x.message)
        }
        this.setState({isModalOpen:false})
        
    }

    render() {
        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          };
        return (
            <div>
                <PopUp callback={this.getData}/>
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    onSelectEvent={(e)=>{console.log(e)}}
                    endAccessor="end"
                    defaultView={"week"}
                    style={{ height: 700 }}
                />
                
                
                
            </div>
        );
    }
}
