import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { playerContext } from '../context/PlayerContext';

const Player = () => {
    const {
        seekBar, seekBg, playerStatus, play, pause, track, time, prev, next, seeksong,
        shuffle, toggleShuffle, loop, toggleLoop, volume, changeVolume
    } = useContext(playerContext);

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4'>
                <img src={track.image} className='w-12' />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img src={assets.shuffle_icon} onClick={toggleShuffle} className={`w-4 cursor-pointer ${shuffle ? 'opacity-100' : 'opacity-50'}`} />
                    <img src={assets.prev_icon} onClick={prev} className='w-4 cursor-pointer' />
                    {playerStatus ? <img src={assets.pause_icon} onClick={pause} className='w-4 cursor-pointer' /> :
                        <img src={assets.play_icon} onClick={play} className='w-4 cursor-pointer' />}
                    <img src={assets.next_icon} onClick={next} className='w-4 cursor-pointer' />
                    <img src={assets.loop_icon} onClick={toggleLoop} className={`w-4 cursor-pointer ${loop ? 'opacity-100' : 'opacity-50'}`} />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second < 10 ? '0' + time.currentTime.second : time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seeksong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second < 10 ? '0' + time.totalTime.second : time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-5 opacity-75'>
                <img src={assets.plays_icon} className='w-4' />
                <img src={assets.mic_icon} className='w-4' />
                <img src={assets.queue_icon} className='w-4' />
                <img src={assets.speaker_icon} className='w-4' />
                <img src={assets.volume_icon} className='w-4' />
                <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={changeVolume}
                    className='w-20 bg-green-800' // Tailwind CSS class for background color
                />
                <img src={assets.mini_player_icon} className='w-4' />
                <img src={assets.zoom_icon} className='w-4' />
            </div>
        </div>
    );
};

export default Player;
