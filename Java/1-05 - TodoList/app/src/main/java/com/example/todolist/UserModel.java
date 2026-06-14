package com.example.todolist;

import java.io.Serializable;

public class UserModel implements Serializable {
    private String name;
    public UserModel(String vname){
        name = vname;
    }

    public String getName (){
        return name;
    }
}
