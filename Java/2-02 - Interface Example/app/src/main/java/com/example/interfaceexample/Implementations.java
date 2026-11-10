package com.example.interfaceexample;

import android.util.Log;

class myClick implements OnClickAction{
    @Override
    public void onClick() {
        Log.e("Alireza", "Clicked!");
    }
}

class  myCalc implements OnCalculate{
    @Override
    public int onSum(int a, int b) {
        return a + b;
    }
}

class myChange implements OnSwitch{
    @Override
    public void change() {
        Log.e("Alireza", "changed");
    }
}