package com.example.finalexam;

public class BooksModel {
    private String name;
    private String writer;
    private boolean isWrite = false;

    public BooksModel(String vname, String vwriter){
        name = vname;
        writer = vwriter;
    }

    public String getTitle(){
        return name;
    }

    public String getAuthor(){
        return writer;
    }

    public Boolean getIsWrite(){
        return isWrite;
    }
}
