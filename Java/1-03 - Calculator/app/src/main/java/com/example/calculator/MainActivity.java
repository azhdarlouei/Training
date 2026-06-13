package com.example.calculator;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.util.Stack;

public class MainActivity extends AppCompatActivity {
    public void printNumber(TextView showNumber, Button view,String character){
        view.setOnClickListener(v->{
            String lastNumber = showNumber.getText().toString();
            String out = lastNumber + character;
            showNumber.setText(out);
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        TextView number = findViewById(R.id.numberView);
        TextView result = findViewById(R.id.resultView);

        Button num0 = findViewById(R.id.num0);
        printNumber(number, num0, "0");
        Button num1 = findViewById(R.id.num1);
        printNumber(number, num1, "1");
        Button num2 = findViewById(R.id.num2);
        printNumber(number, num2, "2");
        Button num3 = findViewById(R.id.num3);
        printNumber(number, num3, "3");
        Button num4 = findViewById(R.id.num4);
        printNumber(number, num4, "4");
        Button num5 = findViewById(R.id.num5);
        printNumber(number, num5, "5");
        Button num6 = findViewById(R.id.num6);
        printNumber(number, num6, "6");
        Button num7 = findViewById(R.id.num7);
        printNumber(number, num7, "7");
        Button num8 = findViewById(R.id.num8);
        printNumber(number, num8, "8");
        Button num9 = findViewById(R.id.num9);
        printNumber(number, num9, "9");

        Button minBtn = findViewById(R.id.minBtn);
        printNumber(number, minBtn, "-");
        Button plusBtn = findViewById(R.id.plusBtn);
        printNumber(number, plusBtn, "+");
        Button timesBtn = findViewById(R.id.timesBtn);
        printNumber(number, timesBtn, "*");
        Button dividedBtn = findViewById(R.id.dividedBtn);
        printNumber(number, dividedBtn, "/");

        Button equalBtn = findViewById(R.id.equalBtn);
        equalBtn.setOnClickListener(v->{
            String numberInput = number.getText().toString();

            Stack<Integer> numbersStack = new Stack<>();
            Stack<Character> operatorStack = new Stack<>();

            String num = "";
            for(int i = 0; i < numberInput.length();i++){
                char c = numberInput.charAt(i);
                if(c != '-' && c != '+' && c != '*' && c != '/') {
                    num += c;
                }else{
                    numbersStack.push(Integer.parseInt(num));
                    operatorStack.push(c);
                    num = "";
                }
            }
            if(!num.isEmpty()){
                numbersStack.push(Integer.parseInt(num));
            }


            for(int i = 0; i < operatorStack.size();i++){
                char op = operatorStack.get(i);
                if(op == '*' || op == '/'){
                    int a = numbersStack.get(i);
                    int b = numbersStack.get(i + 1);

                    int res;
                    if(op == '*'){
                        res = a * b;
                    }else{
                        res = a / b;
                    }

                    numbersStack.set(i, res);
                    numbersStack.remove(i+1);
                    operatorStack.remove(i);
                }
            }

            int res =  numbersStack.get(0);
            for(int i = 0; i < operatorStack.size();i++) {
                char op = operatorStack.get(i);
                int a = numbersStack.get(i + 1);

                if (op == '+') {
                    res += a;
                } else {
                    res -= a;
                }
            }

            result.setText("= " + res);
            number.setText("");
        });
    }
}