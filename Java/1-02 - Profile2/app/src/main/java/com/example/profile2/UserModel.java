package com.example.profile2;

import android.os.Parcelable;

import java.io.Serializable;

public class UserModel implements Serializable {
    private String name;
    private String email;
    private String password;

    public UserModel(String vname, String vemail, String vpassword){
        name = vname;
        email = vemail;
        password = vpassword;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
