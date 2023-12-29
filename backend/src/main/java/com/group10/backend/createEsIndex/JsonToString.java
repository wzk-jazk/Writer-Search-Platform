package com.group10.backend.createEsIndex;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class JsonToString {
    public static String convertJsonToString(String filePath) {
        StringBuilder jsonString = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                jsonString.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonString.toString();
    }
}