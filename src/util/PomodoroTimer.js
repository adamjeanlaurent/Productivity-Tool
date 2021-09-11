import { secondsToFormattedTime } from './constant';
const { ipcRenderer } = window.require("electron");

export default class Timer {
    constructor(selector) {
        this.selector = selector;
        this.ticksLeft = 0;
        this.ticking = false;
        this.interval = null;
        this.currentTotalTicks = 0;
        this.sessionType = '';
    }

    PlaySound() {
        const audio = new Audio('public_sound_beep.mp3');
        for(let i = 0; i < 3; i++) {
            setTimeout(() => { audio.play() }, 1000 * (i + 1));
        }
        document.querySelector(this.selector).textContent = '⏰';
    }

     LogSession() {
        const date = new Date();
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        ipcRenderer.invoke('write', [
            formattedDate,
            formattedTime,
            this.currentTotalTicks,
            this.sessionType
        ]);
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
        console.log(this.sessionType, emoji);
        if(this.selector) {
            document.querySelector(this.selector).textContent = secondsToFormattedTime(this.ticksLeft) + ' ' + emoji;
        }
    }
}