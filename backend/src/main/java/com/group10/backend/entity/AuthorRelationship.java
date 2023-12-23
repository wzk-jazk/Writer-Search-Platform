package com.group10.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("authorrelationship")
public class AuthorRelationship {
    @TableId("authorID")
    private int authorId;
    @TableField("otherID")
    private int otherId;
    @TableField("relationship")
    private String relationship;
}
