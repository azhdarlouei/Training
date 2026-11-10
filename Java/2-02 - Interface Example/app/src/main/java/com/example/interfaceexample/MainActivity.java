package com.example.interfaceexample;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.Objects;

public class MainActivity extends AppCompatActivity {
    OnChangeName onChangeName = new OnChangeName() {
        @Override
        public String onChange(String name) {
            return "name changed to " + name;
        }
    };

    OnLogin onLogin = new OnLogin() {
        @Override
        public String login(String name, String password) {
            if (Objects.equals(name, "ali") && Objects.equals(password, "123")){
                return "logged in";
            }else{
                return "user name or password is wrong";
            }
        }
    };

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

        Button btn1 = findViewById(R.id.btn1);
        btn1.setOnClickListener(v->{
            myClick myClick = new myClick();
            myClick.onClick();
        });

        Button changeName = findViewById(R.id.changeName);
        changeName.setOnClickListener(v->{
            EditText changedText = findViewById(R.id.nameText);
            String message = onChangeName.onChange(String.valueOf(changedText.getText()));
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
        });

        Button calc = findViewById(R.id.calc);
        calc.setOnClickListener(v->{
            EditText firstNumber = findViewById(R.id.sumFirstNumber);
            EditText secoundNumber = findViewById(R.id.sumSecoundNumber);
            myCalc clc = new myCalc();
            int result = clc.onSum(Integer.valueOf(String.valueOf(firstNumber.getText())), Integer.valueOf(String.valueOf(secoundNumber.getText())));
            Toast.makeText(this, String.valueOf(result), Toast.LENGTH_SHORT).show();
        });

        Button login = findViewById(R.id.login);
        login.setOnClickListener(v->{
            EditText username = findViewById(R.id.username);
            EditText password = findViewById(R.id.password);
            String result = onLogin.login(String.valueOf(username.getText()), String.valueOf(password.getText()));
            Toast.makeText(this, result, Toast.LENGTH_SHORT).show();
        });

        Button changeStatus = findViewById(R.id.changeStatus);
        changeStatus.setOnClickListener(v->{
            myChange change = new myChange();
            change.change();
        });
    }
}