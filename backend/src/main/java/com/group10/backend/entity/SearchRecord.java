package com.group10.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("searchrecord")
public class SearchRecord {
    @TableId("record_id")
    private int recordId;
    @TableField("authorId")
    private int authorId;
    @TableField("num")
    private int num;
}
