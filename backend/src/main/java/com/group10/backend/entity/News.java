package com.group10.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("news")
public class News {
    @TableId("news_id")
    private int newsId;
    @TableField("title")
    private String title;
    @TableField("URL")
    private String Url;
}
