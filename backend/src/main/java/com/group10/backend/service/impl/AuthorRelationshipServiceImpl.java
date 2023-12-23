package com.group10.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group10.backend.entity.AuthorRelationship;
import com.group10.backend.mapper.AuthorRelationshipMapper;
import com.group10.backend.service.AuthorRelationshipService;
import org.springframework.stereotype.Service;

@Service
public class AuthorRelationshipServiceImpl extends ServiceImpl<AuthorRelationshipMapper, AuthorRelationship> implements AuthorRelationshipService {
}
