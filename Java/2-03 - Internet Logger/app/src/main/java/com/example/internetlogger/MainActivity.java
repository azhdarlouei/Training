package com.example.internetlogger;

import android.content.Context;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    InternetBroadcastReceiver receiver;
    ListView list;
    ArrayList<String> history;
    ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        list = findViewById(R.id.list);

        history = new ArrayList<>();

        ArrayAdapter<String> adapter = new ArrayAdapter<>(
           this,
                android.R.layout.simple_list_item_1,
                history
        );

        list.setAdapter(adapter);

        InternetStatusListener listener = new InternetStatusListener() {
            @Override
            public void checkInternet(boolean status) {
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
                String time = sdf.format(new Date());

                if (status) {
                    history.add("connected - " + time);
                    adapter.notifyDataSetChanged();
                }else {
                    history.add("disconnected - " + time);
                    adapter.notifyDataSetChanged();
                }
            }
        };

        receiver = new InternetBroadcastReceiver(this, listener);
        IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
        registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(receiver);
    }
}