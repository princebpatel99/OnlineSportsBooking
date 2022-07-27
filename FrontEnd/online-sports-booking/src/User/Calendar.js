import React from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize';
import Modal from 'react-modal';
import { FetchData } from '../RestAPI/database'
require('react-big-calendar/lib/css/react-big-calendar.css');





// Modal.setAppElement('#yourAppElement');
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

    }

    async componentDidMount(){
        await this.getData();
    }

    async getData(){
        var x = await FetchData("/api/OSBSlotBook","GET")
        let arr = [];
        x.forEach((element,id)=>{
            arr.push({id: id,
                title: element.GroundName,
                start: new Date(element.FromDate),
                end: new Date(element.ToDate)})
        })
        this.setState({events:arr});
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
        var x = await FetchData("/api/OSBSlotBook","POST",body)
        this.setState({isModalOpen:false})
        await this.getData();
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
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700 }}
                />
                <a href="#" onClick={()=>{this.setState({isModalOpen:true})}}>Book Slot</a>
                <Modal id="yourAppElement"
                    isOpen={this.state.isModalOpen}
                    onRequestClose={()=>{this.setState({isModalOpen:false})}}
                    subtitle="Example Modal"
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                   
                    <h2>Book a Slot</h2>
                    <label>From Date</label>
                    <input type="datetime-local" onChange={(e)=>{this.setState({fromDate:e.target.value})}}/>
                    <label>To Date</label>
                    <input type="datetime-local" onChange={(e)=>{this.setState({toDate:e.target.value})}}/>
                    <br/>
                    <label>Ground</label>
                    <select onChange={(e)=>{
                        this.setState({ground:e.target.value})}}>
                        <option disabled selected>Select Garden</option>
                        <option>Ground 1</option>
                        <option>Ground 2</option>
                        <option>Ground 3</option>
                        <option>Ground 4</option>
                    </select>

                    <label>Sports</label>
                    <select onChange={(e)=>{this.setState({sports:e.target.value})}}>
                        <option disabled selected>Select Sports</option>
                        <option>Sports 1</option>
                        <option>Sports 2</option>
                        <option>Sports 3</option>
                        <option>Sports 4</option>
                    </select>

                    <br/>
                    <input type="submit" value="Book a slot" onClick={()=>{this.bookSlot()}}/>
                </Modal>
            </div>
        );
    }
}
