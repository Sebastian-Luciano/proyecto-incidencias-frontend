import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export const subscribeToIncidences = (callback) => {
  socket.on('newIncidence', (incidence) => {
    callback(incidence);
  });
};

export const subscribeToUpdates = (callback) => {
  socket.on('incidenceUpdate', (incidence) => {
    callback(incidence);
  });
};

export default socket;