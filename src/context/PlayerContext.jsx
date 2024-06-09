import { createContext, useEffect, useState, useRef } from "react";
import { songsData } from "../assets/assets";

export const playerContext = createContext();
const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playerStatus, setPlayerStatus] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(1); // volume range from 0 to 1
    const [shuffledSongs, setShuffledSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (shuffle) {
            const shuffledArray = [...songsData].sort(() => Math.random() - 0.5);
            setShuffledSongs(shuffledArray);
        } else {
            setShuffledSongs(songsData);
        }
    }, [shuffle]);

    const play = () => {
        audioRef.current.play();
        setPlayerStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(false);
    };

    const playWithID = async (id) => {
        await setTrack(shuffledSongs[id]);
        await audioRef.current.play();
        setPlayerStatus(true);
    };

    const prev = async () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            await setTrack(shuffledSongs[newIndex]);
            await audioRef.current.play();
            setPlayerStatus(true);
        }
    };

    const next = async () => {
        if (currentIndex < shuffledSongs.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            await setTrack(shuffledSongs[newIndex]);
            await audioRef.current.play();
            setPlayerStatus(true);
        } else if (loop) {
            await audioRef.current.play();
        }
    };

    const seeksong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    const toggleShuffle = () => {
        setShuffle(!shuffle);
    };

    const toggleLoop = () => {
        setLoop(!loop);
    };

    const changeVolume = (e) => {
        setVolume(e.target.value);
    };

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };

            audioRef.current.onended = () => {
                if (loop) {
                    playWithID(currentIndex);
                } else {
                    next();
                }
            };
        });
    }, [audioRef, track.id, shuffle, loop, currentIndex]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playWithID,
        prev,
        next,
        seeksong,
        shuffle,
        toggleShuffle,
        loop,
        toggleLoop,
        volume,
        changeVolume,
    };

    return (
        <playerContext.Provider value={contextValue}>
            {props.children}
        </playerContext.Provider>
    );
};

export default PlayerContextProvider;
