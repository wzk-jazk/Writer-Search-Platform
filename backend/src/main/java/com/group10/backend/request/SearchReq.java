package com.group10.backend.request;

import lombok.Data;

import java.util.Date;

@Data
public class SearchReq {
    private String name;
    private String provence;
    private String city;
    private String school;
    private String style;
    private Date birthDateFrom;
    private Date birthDateTo;
    private int ageFrom;
    private int ageTo;
}
