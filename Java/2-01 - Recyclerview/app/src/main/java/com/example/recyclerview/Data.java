package com.example.recyclerview;

import java.util.ArrayList;

public class Data {
    private String data;

    public static ArrayList<Data> dataList = new ArrayList<>();

    public Data(String data) {
        this.data = data;
    }

    public String getData() {
        return data;
    }
}
