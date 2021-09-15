// https://www.youtube.com/watch?v=oAaS9ix8pes

import { useEffect, useState } from 'react';
import PomodoroTimer from '../../util/PomodoroTimer';
import { MINUTE } from '../../util/constant';
import './Timer.css'
import { withRouter, Link } from 'react-router-dom';

const electron = window.require('electron');
const powerSaveBlocker = electron.remote.powerSaveBlocker;

function Timer(props) {
    useEffect(() => {
        setPowerBlockerId(powerSaveBlocker.start('prevent-display-sleep'));
    }, []);

    const handleTimeChange = (event) => {
        pomodoroTimer.Pause();
        
        let sessionType = '';
        const isBreak = (event.target.id === 'breakTime');
        isBreak ? sessionType = 'break' : sessionType = 'work';

        const ticks = (parseInt(event.target.value) * MINUTE);
        pomodoroTimer.SetTicks(ticks, sessionType);
    }

    const handlePlay = (event) => {
        pomodoroTimer.Play();
    }

    const handlePause = (event) => {
        pomodoroTimer.Pause();
    }

    const [pomodoroTimer, setPomodoroTimer] = useState(new PomodoroTimer('#timer'));
    const [powerBlockerId, setPowerBlockerId] = useState(null);
  
    return (
        <div className="App">
            <div id="timer">0:00</div>
            <div id ="menuBar">
            <select name="" id="workTime" onChange={handleTimeChange}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                </select>

                <select name="" id="breakTime" onChange={handleTimeChange}>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                </select>
                <button id ="play" type="button" className="btn btn-success" onClick={handlePlay}>Play</button>
                <button id = "pause" type="button" className="btn btn-danger" onClick={handlePause}>Pause</button>
                <Link to={{ pathname: '/analysis' }}><button id="analysis" type="button" className ="btn btn-primary" onClick={() => {powerSaveBlocker.stop(powerBlockerId)}}>Analysis</button></Link>
            </div> 
        </div>
    );
}

export default withRouter(Timer);