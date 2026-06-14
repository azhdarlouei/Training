package com.example.recyclerview;

public class TempListItem {
    private String[] name = {
            "Emily",
            "James",
            "Sophia",
            "William",
            "Olivia",
            "Benjamin",
            "Ava",
            "Alexander",
            "Mia",
    };
    private int[] avatar = {
            R.drawable.avatar1,
            R.drawable.avatar2,
            R.drawable.avatar3,
            R.drawable.avatar4,
            R.drawable.avatar5,
            R.drawable.avatar6,
            R.drawable.avatar7,
            R.drawable.avatar8,
            R.drawable.avatar9,
            R.drawable.avatar10,
    };

    public String[] getName() {
        return name;
    }

    public int[] getAvatar() {
        return avatar;
    }

}