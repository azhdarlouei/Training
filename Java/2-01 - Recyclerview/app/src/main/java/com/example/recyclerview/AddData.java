package com.example.recyclerview;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class AddData extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_data);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Button addBtn = findViewById(R.id.addDataBtn);
        addBtn.setOnClickListener(v->{
            EditText dataInput = findViewById(R.id.dataInput);
            Data.dataList.add(new Data(dataInput.getText().toString()));

            Intent mainPage = new Intent(this, MainActivity.class);
            startActivity(mainPage);
            finish();
        });
    }
}
