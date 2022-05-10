package com.company;

public class Admin implements UserInterface {
    String login, password;

    public Admin(String login, String password) {
        this.login = login;
        this.password = password;
    }

    @Override
    public String getLogin() {
        return this.login;
    }

    @Override
    public String getPassword() {
        return "fuck you";
    }

    @Override
    public String toString() {
        return "Admin{" +
                "login='" + getLogin() + '\'' +
                ", password='" + getPassword() + '\'' +
                '}';
    }
}
