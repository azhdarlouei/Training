package com.example.todolist;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Todo extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_todo);

        UserModel user = (UserModel) getIntent().getSerializableExtra("user");

        TextView welcomeBox = findViewById(R.id.welcomeBox);
        welcomeBox.setText("Hello " + user.getName() + " 😊");

        RecyclerView recyclerView = findViewById(R.id.recyclerview);

        ArrayList<TodoModel> todos = new ArrayList<>();
        TodoAdapter adapter = new TodoAdapter(todos);

        recyclerView.setLayoutManager(
                new LinearLayoutManager(this)
        );

        recyclerView.setAdapter(adapter);

        EditText taskSubject = findViewById(R.id.taskInput);
        Button addTask = findViewById(R.id.addTaskBtn);
        addTask.setOnClickListener(v->{
            String task = taskSubject.getText().toString();

            if(!task.isEmpty()){
                todos.add(new TodoModel(task));

                adapter.notifyDataSetChanged();

                taskSubject.setText("");
            }else{
                Toast.makeText(this, "Please enter a task!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
