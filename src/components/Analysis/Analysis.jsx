import { Chart } from "react-google-charts";
import { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Logger from '../../util/Logger';
const { ipcRenderer } = window.require('electron');

function Analysis() {
    const logging = false;

    const backToCalendar = async() => {
        changeHideCalendar(false);
        changeCalendarDate(new Date());
        changeTimeReport({});
        changeCurrentChartData([]);
        changeCompletedToDoItems([]);
    }

    const fetchCompletedToDoItems = async () => {
        const allCompletedDoToItems = await ipcRenderer.invoke('readToDoItemsData');

        const requestedDate = `${calendarDate.getMonth() + 1}/${calendarDate.getDate()}/${calendarDate.getFullYear()}`;

        if(allCompletedDoToItems.length) {
            return;
        }

        const toDoItemsData = allCompletedDoToItems.filter(data => data.date === requestedDate);
        
        return toDoItemsData.map((toDoItemData) => {
            return toDoItemData.toDoItem;
        });
    }

    const fetchChartData = async () => {
        const allChartData = await ipcRenderer.invoke('readTimerData');

        logging && Logger.g(`allChartData: ${allChartData}`);
        logging && Logger.g(`allChartData length: ${allChartData.length}`);

        for(let chartData of allChartData) {
            logging && Logger.g(chartData);
        }

        const requestedDate = `${calendarDate.getMonth() + 1}/${calendarDate.getDate()}/${calendarDate.getFullYear()}`;

        logging && Logger.g(`requestedDate: ${requestedDate}`);

        const chartData = allChartData.filter(data => data.date === requestedDate);

        if(chartData.length === 0) {
            document.querySelector('#error').textContent = 'No Data For This Date';
            return;
        }

        document.querySelector('#error').textContent = '';

        logging && Logger.g(`chartData: ${chartData}`);

        for(let cd of chartData) {
            logging && Logger.g(cd);
        }
        const chartHeading = ['Session', 'Time'];
        
        let totalBreakTime = 0;
        let totalWorkTime = 0;
    
        for(let data of chartData) {
            if(data.sessionType === 'break') {
                totalBreakTime += data.totalTime;
            }
    
            else if(data.sessionType === 'work') {
                totalWorkTime += data.totalTime;
            }
    
            else {
                throw new Error('session type should be valid');
            }
        }

        logging && Logger.g(`totalBreakTime: ${totalBreakTime}`);
        logging && Logger.g(`totalWorkTime: ${totalWorkTime}`);
    
        const finalizedData = [chartHeading, ['Work', totalWorkTime], ['Break', totalBreakTime]];

        logging && Logger.g(`finalizedData: ${finalizedData}`);
        
        for(let fd of finalizedData) {
            logging && Logger.g(fd);
        }

        const breakInMinutes = ((totalBreakTime / 60)).toFixed(2);
        const workInMinutes = ((totalWorkTime / 60)).toFixed(2);
        const breakInHours =((breakInMinutes / 60)).toFixed(2);
        const workInHours = ((workInMinutes / 60)).toFixed(2);

        const totalTimeTracked = (parseFloat(workInHours) + parseFloat(breakInHours));

        changeTimeReport({
            breakInMinutes: breakInMinutes,
            workInMinutes: workInMinutes,
            breakInHours: breakInHours,
            workInHours: workInHours,
            firstLog: chartData[0].time,
            lastLog: chartData[chartData.length - 1].time,
            totalTimeTracked: totalTimeTracked
        });
        changeCurrentChartData(finalizedData);
        changeCompletedToDoItems(await fetchCompletedToDoItems());
        changeHideCalendar(true);
    }
    
    const [calendarDate, changeCalendarDate] = useState(new Date());
    const [hideCalendar, changeHideCalendar] = useState(false);
    const [currentChartData, changeCurrentChartData] = useState([]);
    const [timeReport, changeTimeReport] = useState({});
    const [completedToDoItems, changeCompletedToDoItems] = useState([]);
    return (
        <div>
            {!hideCalendar && 
                <div> 
                    <Calendar onChange={changeCalendarDate} value={calendarDate}/>
                    <h1 style = {{'color': 'blue'}}>Selected Date: {`${calendarDate.getMonth() + 1}/${calendarDate.getDate()}/${calendarDate.getFullYear()}`}</h1>
                    <h2 id="error" style = {{'color': 'red'}}></h2>
                    <button onClick={fetchChartData}>See Chart</button>
                    <Link to={{ pathname: '/' }}><button id="analysis" type="button" className ="btn btn-primary">Timer</button></Link>
                </div>
            }

            {hideCalendar &&
                <div>
                    <Chart 
                        style={{'marginTop': '5%'}}
                        width={'1000px'}
                        height={'400px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={currentChartData}
                        options={{
                            title: 'My Daily Activities',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />

                    <table className="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Break/Minutes</th>
                        <td>{timeReport.breakInMinutes}</td>
                        </tr>
                        <tr>
                        <th scope="row">Break/Hours</th>
                        <td>{timeReport.breakInHours}</td>
                        </tr>
                        <tr>
                        <th scope="row">Work/Minutes</th>
                        <td>{timeReport.workInMinutes}</td>
                        </tr>
                        <tr>
                        <th scope="row">Work/Hours</th>
                        <td>{timeReport.workInHours}</td>
                        </tr>
                        <tr>
                        <th scope="row">First Log</th>
                        <td>{timeReport.firstLog}</td>
                        </tr>
                        <tr>
                        <th scope="row">Last Log</th>
                        <td>{timeReport.lastLog}</td>
                        </tr>
                        <tr>
                        <th scope="row">Time Online/Hours</th>
                        <td>{timeReport.totalTimeTracked}</td>
                        </tr>
                    </tbody>
                    </table>
                    <button onClick={backToCalendar}>Back To Calendar</button>
                    <Link to={{ pathname: '/' }}><button id="analysis" type="button" className ="btn btn-primary">Timer</button></Link>
                </div>
            }
        </div>
    );
}

export default withRouter(Analysis);