export function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' '+ ampm;
    return strTime;
  }

export const secondsToFormattedTime = (sec) => {
	const minutes = Math.floor((sec / 60));
    const seconds = (sec % 60);

    let minutesStr = minutes.toString();
    let secondsStr = seconds.toString();

    if(minutes < 10) {
        minutesStr = '0' + minutes;
    }

    if(seconds < 10) {
        secondsStr = '0' + seconds;
    }

    return `${minutesStr}:${secondsStr}`;
}