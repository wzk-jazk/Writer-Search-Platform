package com.group10.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group10.backend.entity.Author;
import com.group10.backend.mapper.AuthorMapper;
import com.group10.backend.service.AuthorService;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl extends ServiceImpl<AuthorMapper, Author> implements AuthorService {
}
