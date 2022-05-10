package com.company;

import java.util.*;

public class Main {

    public static void main(String[] args) {
        Random random = new Random();
        ArrayList<Integer> lst = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            lst.add(random.nextInt());
        }

        ArrayList<Integer> newlst = new ArrayList<>();
        for (var a : lst) {
            newlst.add(a * 2 * random.nextInt());
        }

        newlst.sort(new Comparator<>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                if(o1 > o2){
                    return -1;
                }else if (o1 < o2){
                    return 1;
                }else{
                    return 0;
                }
            }
        });

        System.out.println(newlst);


//        UserInterface u = new User("qwe", "abcdef");
//        UserInterface a = new Admin("asd", "asd");
//
//        System.out.println(u);
//        System.out.println(a);
//
//        Thread printthread = new Thread(() -> {
//            for (int i = 0; i < 10000; i++)
//                System.out.println("hello "+i+" from "+Thread.currentThread().getName());
//
//        });
//
//        Thread printthread2 = new Thread(() -> {
//            for (int i = 0; i < 10000; i++) {
//                System.out.println("hello " + i + " from " + Thread.currentThread().getName());
//                if(i==75){
//                    throw new RuntimeException("#RIP");
//                }
//            }
//
//        });
//
//        printthread.start();
//        printthread2.start();
//
//        try {
//            printthread2.join();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        HashMap<Integer, UserInterface> userHashMap = new HashMap<>();
//        userHashMap.put(0, u);
//        userHashMap.put(1, a);
//
//        System.out.println(userHashMap.get(1));
    }
}

