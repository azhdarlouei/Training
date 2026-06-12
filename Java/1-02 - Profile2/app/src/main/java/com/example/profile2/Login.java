package com.example.profile2;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class Login extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button loginButton = findViewById(R.id.loginButton);
        loginButton.setOnClickListener(v->{
            EditText nameInput = findViewById(R.id.nameInput);
            String name = nameInput.getText().toString();
            EditText emailInput = findViewById(R.id.emailInput);
            String email = emailInput.getText().toString();
            EditText passwordInput = findViewById(R.id.passwordInput);
            String password = passwordInput.getText().toString();

            Intent profilePage = new Intent(Login.this, Profile.class);
            // Send with intent
            profilePage.putExtra("name", name);
            profilePage.putExtra("password", password);
            profilePage.putExtra("email", email);

            // Send with user model
            UserModel user = new UserModel(name, email, password);
            profilePage.putExtra("user", user);

            startActivity(profilePage);
        });
    }
}
