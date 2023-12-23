package com.group10.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("book")
public class Book {
    @TableId("id")
    private int id;
    @TableField("title")
    private String title;
    @TableField("authorID")
    private int authorId;
    @TableField("BriefIntroduction")
    private String briefIntroduction;
    @TableField("LiteraryGenres")
    private String literaryGenres;
    @TableField("source")
    private String source;
    @TableField("honors")
    private String honors;
    @TableField("publicationYear")
    private int publicationYear;
}
