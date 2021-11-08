import { secondsToFormattedTime } from './dateTime';
import Logger from './Logger';
const { ipcRenderer } = window.require("electron");

export default class PomodoroTimer {
    constructor(selector) {
        this.selector = selector;
        this.ticksLeft = 0;
        this.ticking = false;
        this.interval = null;
        this.currentTotalTicks = 0;
        this.sessionType = '';
        this.domElement = document.querySelector(this.selector);

        try {
            this.audio =  new Audio('public_sound_beep.mp3');
        }

        catch {
            this.audio = null;
        }
       
    }

    PlaySound() {
        new Notification('Pomodoro Timer ⏰', { body: 'Timer Up! :)' });

        if(this.audio) {
            for(let i = 0; i < 3; i++) {
                setTimeout(() => { 
                    try {
                        this.audio.play();
                    }
                    catch {
                        console.log('Error Playing Audio!');
                    }
                 }, 1000 * (i + 1));
            }
        }
        this.domElement.textContent = '⏰';
    }

     LogSession() {
        const date = new Date();
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const log = `${formattedDate} ${formattedTime} ${this.currentTotalTicks} ${this.sessionType}\n`;

        ipcRenderer.invoke('writeTimerData', [
            formattedDate,
            formattedTime,
            this.currentTotalTicks,
            this.sessionType
        ]);
        
        Logger.timeStamp(`Logged: ${log}`);
        this.currentTotalTicks = 0;
    }

    SetTicks(ticks, sessionType) {
        if(this.currentTotalTicks !== 0) this.LogSession();
        this.sessionType = sessionType;
        this.ticksLeft = ticks;
        this.currentTotalTicks = 0;
        this.UpdateDom();
    }

    Play() {
        // update ui with time
        if(this.ticking) return;
        if(this.ticksLeft <= 0) return; // stops negative countdown
        this.ticking = true;
        this.interval = setInterval(this.Tick.bind(this), 1000);
    }

    Pause() {
        if(!this.ticking) return;
        clearInterval(this.interval);
        this.ticking = false;
    }

    Tick() {
        Logger.heartbeat();
        // sets time in DOM
        if(this.ticksLeft === 0) {
            clearInterval(this.interval);
            this.LogSession();
            this.PlaySound();
            return;
        }
        this.UpdateDom();
        this.currentTotalTicks++;
        this.ticksLeft--;
    }

     UpdateDom() {
        const emoji = this.sessionType === 'break' ? '🛌' : '😤';
        if(this.selector) {
            this.domElement.textContent = secondsToFormattedTime(this.ticksLeft) + ' ' + emoji;
        }
    }
}