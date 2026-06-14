package com.example.todolist;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class TodoAdapter extends RecyclerView.Adapter<TodoAdapter.ViewHolder> {

    private ArrayList<TodoModel> todos;

    public TodoAdapter(ArrayList<TodoModel> vtodos) {
        todos = vtodos;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(
            @NonNull ViewGroup parent,
            int viewType
    ) {

        View view = LayoutInflater
                .from(parent.getContext())
                .inflate(
                        R.layout.todo_item,
                        parent,
                        false
                );

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(
            @NonNull ViewHolder holder,
            int position
    ) {

        holder.titleTxt.setText(
                todos.get(position).getSubject()
        );
    }

    @Override
    public int getItemCount() {
        return todos.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView titleTxt;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            titleTxt = itemView.findViewById(R.id.taskSubject);
        }
    }
}