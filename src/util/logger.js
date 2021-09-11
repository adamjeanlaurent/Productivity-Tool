import colors from 'colors';

export default class Logger {
    static r(t) {
        console.log(colors.red(t));
    }
    static g(t) {
        console.log(colors.green(t));
    }
}