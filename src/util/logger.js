import colors from 'colors';
import { formatAMPM } from './dateTime';

export default class Logger {
    static r(t) {
        console.log(colors.red(t));
    }
    static g(t) {
        console.log(colors.green(t));
    }
    static timeStamp(event) {
        const date = new Date();
        console.log(`${formatAMPM(date)}\nEvent: ${event}`);
    }
    static heartbeat() {
        const date = new Date();
        console.log(`${formatAMPM(date)}: 💖`);
    }
}