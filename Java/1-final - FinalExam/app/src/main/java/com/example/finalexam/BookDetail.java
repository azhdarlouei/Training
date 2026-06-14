package com.example.finalexam;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class BookDetail extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.book_detail);

        String title = getIntent().getStringExtra("title");
        String author = getIntent().getStringExtra("author");


        TextView showTitle = findViewById(R.id.showName);
        showTitle.setText(title);
        TextView showAuthor = findViewById(R.id.showAuthor);
        showAuthor.setText(title);

        Button backBtn = findViewById(R.id.backBtn);
        backBtn.setOnClickListener(v->{
            Intent booksPage = new Intent(this, BookDetail.class);
            startActivity(booksPage);
        });

    }
}
