package com.company;

public class User implements UserInterface {
    String login;
    String password;

    User(String login, String password) {
        this.login = login;
        this.password = password;
    }

    @Override
    public String getLogin() {
        return login;
    }

    @Override
    public String getPassword() {
        return password.replaceAll(".", "*");
    }

    @Override
    public String toString() {
        return "User{" +
                "login='" + getLogin() + '\'' +
                ", password='" + getPassword() + '\'' +
                '}';
    }
}
