package com.company;

public interface UserInterface {
    static User createUser(String login, String password) {
        return new User(login, password);
    }

    String getLogin();

    String getPassword();

    @Override
    String toString();
}
