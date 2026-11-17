package com.example.internetlogger;

import android.net.NetworkInfo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

public class InternetBroadcastReceiver extends BroadcastReceiver {
    Context context;
    InternetStatusListener listener;

    public InternetBroadcastReceiver(Context context, InternetStatusListener listener) {
        this.context = context;
        this.listener = listener;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals(ConnectivityManager.CONNECTIVITY_ACTION)){
            if (onConnect()){
                listener.checkInternet(true);
            }else {
                listener.checkInternet(false);
            }
        }
    }

    public boolean onConnect(){
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = cm.getActiveNetworkInfo();

        if(networkInfo != null && networkInfo.isConnectedOrConnecting()){
            if(networkInfo.getType() == ConnectivityManager.TYPE_MOBILE || networkInfo.getType() == ConnectivityManager.TYPE_WIFI){
                return true;
            }
        }

        return false;
    }
}
