import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const PlayerEl = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(PlayerEl);
const PLAYERTIME_KEY = "videoplayer-current-time";

function onTimeUpdate(data) {
    console.log(data.duration, data.percent, data.seconds);
    localStorage.setItem(PLAYERTIME_KEY, data.seconds);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

if (localStorage.getItem(PLAYERTIME_KEY)) { 
    player.setCurrentTime(localStorage.getItem(PLAYERTIME_KEY))
};