package com.example.todolist;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        AppCompatDelegate.setDefaultNightMode(
                AppCompatDelegate.MODE_NIGHT_NO
        );

        setContentView(R.layout.activity_main);

        Button loginBtn = findViewById(R.id.loginButton);
        EditText  nameInput = findViewById(R.id.nameInput);

        loginBtn.setOnClickListener(v->{
            if(nameInput.getText().length() != 0) {
                Intent todoPage = new Intent(MainActivity.this, Todo.class);

                UserModel user = new UserModel(nameInput.getText().toString());
                todoPage.putExtra("user", user);

                startActivity(todoPage);
            }else{
                Toast.makeText(this, "please enter your name!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}