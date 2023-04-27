import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60 * 1000);
  const [breakTime, setBreakTime] = useState(5 * 60 * 1000);
  const [currentTime, setCurrentTime] = useState(pomodoroTime);
  const [BreakCurrentTime, setBreakCurrentTime] = useState(breakTime);
  const [currentMode, setCurrentMode] = useState(0);


  useEffect(() => {
    let intervalId;

    if (isRunning) {
      const startTime = Date.now();
      const endTime = startTime + currentTime;
      intervalId = setInterval(() => {
        const remainingTime = Math.max(endTime - Date.now(), 0);
        setCurrentTime(remainingTime);
      }, 1000);
    }

    if (currentTime === 0) {
      setCurrentMode((currentMode + 1) % 2);
      setCurrentTime(currentMode === 0 ? BreakCurrentTime : pomodoroTime);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, currentTime, BreakCurrentTime, pomodoroTime, currentMode]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = (timeInMilliseconds) => {
    let minutes = Math.floor(timeInMilliseconds / 60000);
    let seconds = ((timeInMilliseconds % 60000) / 1000).toFixed(0);

    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <View style={styles.container}>
      <Text>{currentMode === 0 ? 'Pomodoro funcionando' : 'Descanso'}</Text>
      <Text style={styles.timer}>{formatTime(currentTime)}</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <Text style={styles.buttonText}>
          {isRunning ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  timer: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1E6738',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
