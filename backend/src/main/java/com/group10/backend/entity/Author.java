package com.group10.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("author")
public class Author {
    @TableId("id")
    private int id;
    @TableField("name")
    private String name;
    @TableField("url")
    private String imgUrl;
    @TableField("organization")
    private String organization;
    @TableField("country")
    private String country;
    @TableField("role")
    private String role;
    @TableField("age")
    private int age;
    @TableField("birthDate")
    private Date birthDate;
    @TableField("deathDate")
    private Date deathDate;
    @TableField("Writtingstyle")
    private String writingStyle;
    @TableField("hometown")
    private String hometown;
    @TableField("pseudonym")
    private String pseudonym;
    @TableField("Representative")
    private String representative;
    @TableField("BriefIntroduction")
    private String briefIntroduction;
    @TableField("honors")
    private String honors;
}
