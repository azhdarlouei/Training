package com.example.todolist;

import java.io.Serializable;

public class TodoModel implements Serializable {
    private String subject;

    public TodoModel(String vsubject){
        subject = vsubject;
    }

    public String getSubject(){
        return subject;
    }
}
