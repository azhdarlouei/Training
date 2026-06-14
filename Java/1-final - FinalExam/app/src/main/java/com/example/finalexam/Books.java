package com.example.finalexam;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class Books extends AppCompatActivity {

    private EditText etBookTitle;
    private EditText etAuthor;
    private Button btnAdd;
    private RecyclerView recyclerView;
    private BookAdapter adapter;
    private List<BooksModel> bookList;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        setContentView(R.layout.activity_books);

        // اتصال ویوها
        etBookTitle = findViewById(R.id.etBookTitle);
        etAuthor = findViewById(R.id.etAuthor);
        btnAdd = findViewById(R.id.btnAdd);
        recyclerView = findViewById(R.id.recyclerView);

        // راه‌اندازی لیست و اداپتر
        bookList = new ArrayList<>();
        adapter = new BookAdapter(this, bookList);   // ← مهم: this اضافه شد

        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter);

        // کلیک دکمه افزودن
        btnAdd.setOnClickListener(v -> {
            String title = etBookTitle.getText().toString().trim();
            String author = etAuthor.getText().toString().trim();

            if (!title.isEmpty() && !author.isEmpty()) {
                BooksModel newBook = new BooksModel(title, author);

                adapter.addBook(newBook);

                // پاک کردن فیلدها
                etBookTitle.setText("");
                etAuthor.setText("");

                // اسکرول به آخر
                recyclerView.scrollToPosition(bookList.size() - 1);

                // نمایش پیام بعد از ۲ ثانیه
                new Handler().postDelayed(() ->
                                Toast.makeText(Books.this, "book added", Toast.LENGTH_SHORT).show()
                        , 2000);

            } else {
                Toast.makeText(Books.this, "لطفاً نام کتاب و نویسنده را وارد کنید", Toast.LENGTH_SHORT).show();
            }
        });

        Button bbackBtn = findViewById(R.id.bbackBtn);
        bbackBtn.setOnClickListener(v->{
            Intent firstPage = new Intent(this, MainActivity.class);
            startActivity(firstPage);
        });
    }
}