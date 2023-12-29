package com.group10.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Date;

@Data
@TableName("author")
public class Author {
    @TableId("id")
    private int id;
    @TableField("name")
    private String name;
    @TableField("url")
    private String url;
    @TableField("imgUrl")
    private String imgUrl;
    @TableField("age")
    private int age;
    @TableField("birthDate")
    private String birthDate;
    @TableField("deathDate")
    private String deathDate;
    @TableField("school")
    private String school;
    @TableField("Writtingstyle")
    private String writingStyle;
    @TableField("provence")
    private String province;
    @TableField("city")
    private String city;
    @TableField("pseudonym")
    private String pseudonym;
    @TableField("Representative")
    private String representative;
    @TableField("BriefIntroduction")
    private String briefIntroduction;
    @TableField("honors")
    private String honors;
    @TableField("gender")
    private String gender;
}
