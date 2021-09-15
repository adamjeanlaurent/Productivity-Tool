import { secondsToFormattedTime } from './constant';
import Logger from './logger';
const { ipcRenderer } = window.require("electron");

export default class Timer {
    constructor(selector) {
        this.selector = selector;
        this.ticksLeft = 0;
        this.ticking = false;
        this.interval = null;
        this.currentTotalTicks = 0;
        this.sessionType = '';
        this.audio =  new Audio('public_sound_beep.mp3');
    }

    PlaySound() {
        for(let i = 0; i < 3; i++) {
            setTimeout(() => { this.audio.play() }, 1000 * (i + 1));
        }
        document.querySelector(this.selector).textContent = '⏰';
    }

     LogSession() {
        const date = new Date();
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const log = `${formattedDate} ${formattedTime} ${this.currentTotalTicks} ${this.sessionType}\n`;

        ipcRenderer.invoke('write', [
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
            document.querySelector(this.selector).textContent = secondsToFormattedTime(this.ticksLeft) + ' ' + emoji;
        }
    }
}