package com.rohit.interactv;

import android.app.Application;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import java.net.URISyntaxException;

public class SocketInstance  {
    private static Socket mSocket;
    private static final String URL =  "https://mellow-entertaining-celery.glitch.me/";

    public SocketInstance() {


    }
    public static Socket getSocketInstance(){
        try {
            mSocket = IO.socket(URL);
        } catch (URISyntaxException e) {}
        mSocket.connect();
        return mSocket;
    }



}
