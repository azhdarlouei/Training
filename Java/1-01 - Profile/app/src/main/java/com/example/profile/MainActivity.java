package com.example.profile;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

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

        ImageView profile = findViewById(R.id.imageView);
        profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "this is profile",Toast.LENGTH_SHORT).show();
            }
        });

        Button name = findViewById(R.id.button);
        name.setOnClickListener(new View.OnClickListener(){
            @Override
            public  void  onClick(View v){
                Toast.makeText(MainActivity.this, "this is user name",Toast.LENGTH_SHORT).show();
            }
        });

        LinearLayout changeUserName = findViewById(R.id.linearLayout);
        changeUserName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "this is a button for change user name", Toast.LENGTH_SHORT).show();
            }
        });

        LinearLayout changeName = findViewById(R.id.linearLayout2);
        changeName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "this is a button for change name", Toast.LENGTH_SHORT).show();
            }
        });

        LinearLayout changePassword = findViewById(R.id.linearLayout3);
        changePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "this is a button for change password", Toast.LENGTH_SHORT).show();
            }
        });

        Button logOut = findViewById(R.id.button2);

        logOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "log out button",Toast.LENGTH_SHORT).show();
            }
        });
    }
}