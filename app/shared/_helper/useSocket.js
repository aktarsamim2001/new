// src/hooks/useSportsSocket.js
import { useEffect, useState } from "react";
import socket from "../_services/socketService";
import { useDispatch } from "react-redux";
import { setAllData } from "../../store/socketSlice";

export function useBetSocket(sportType) {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const key = `all${sportType}`;
    socket.emit("all", sportType);
    socket.on(key, (payload) => {
      setData(payload);
      dispatch(setAllData(payload));
    });
    return () => {
      socket.disconnect();
    };
  }, [sportType, socket]);

  return data;
}
export function useInPlay(sportType) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const key = `inplay${sportType}`;

    socket.emit("inplay", sportType);

    socket.on(key, (payload) => {
      setData(payload);
    });

    return () => {
      socket.off(key);
    };
  }, [sportType]);

  return data;
}

export function useToday(sportType) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const key = `today${sportType}`;

    socket.emit("today", sportType);

    socket.on(key, (payload) => {
      setData(payload);
    });

    return () => {
      socket.off(key);
    };
  }, [sportType]);

  return data;
}
