package com.group10.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.group10.backend.entity.Author;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthorMapper extends BaseMapper<Author> {
}
