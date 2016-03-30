/**
 * Created by deenjun on 16/2/14.
 */

import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(() => {
        const state = store.getState().toJS();
        console.log(state);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
        io.emit('state', state);
    });

    io.on('connection', socket => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', (data) => {
          console.log(data);
          console.log('<<<<<<<<<<<<<<<<<<<<<<<<');
          store.dispatch.call(store, data);
        });
    });
};
