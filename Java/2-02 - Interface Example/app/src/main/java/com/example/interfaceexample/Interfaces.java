package com.example.interfaceexample;

interface OnClickAction {
    void onClick();
}

interface OnChangeName {
    String onChange(String name);
}

interface OnCalculate {
    int onSum(int a, int b);
}

interface OnLogin {
    String login(String name, String password);
}

interface OnSwitch {
    void change();
}