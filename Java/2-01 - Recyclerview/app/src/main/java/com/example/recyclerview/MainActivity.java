package com.example.recyclerview;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements OnItemClickListener {
    private ArrayList<Data> data;
    private DataAdapter adapter;
    private ActivityResultLauncher<Intent> addDataLauncher;

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

        RecyclerView rv = findViewById(R.id.rv);

        data = Data.dataList;
        adapter = new DataAdapter(data, this);

        rv.setLayoutManager(new LinearLayoutManager(this));

        rv.setAdapter(adapter);

        Button btn = findViewById(R.id.addPageBtn);
        btn.setOnClickListener(v -> {
            Intent addDataPage = new Intent(this, AddData.class);
            startActivity(addDataPage);
            finish();
        });
    }

    @Override
    protected void onResume() {
        super.onResume();

        adapter.notifyDataSetChanged();
    }

    @Override
    public void onItemClick(Data data) {
        Toast.makeText(this, data.getData(), Toast.LENGTH_SHORT).show();
    }
}