package com.example.profile2;

import android.os.Bundle;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class Profile extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activiry_profile);

        // get with intent
        String name = getIntent().getStringExtra("name");
        String email = getIntent().getStringExtra("email");
        String password = getIntent().getStringExtra("password");

        // get with user model
        UserModel user = (UserModel) getIntent().getSerializableExtra("user");

        name = user.getName();
        email = user.getEmail();
        password = user.getPassword();

        TextView nameTextView = findViewById(R.id.nameTextBox);
        TextView emailTextView = findViewById(R.id.emailTextBox);
        TextView passwordTextView = findViewById(R.id.passwordTextBox);

        nameTextView.setText(name);
        emailTextView.setText(email);
        passwordTextView.setText(password);
    }
}
