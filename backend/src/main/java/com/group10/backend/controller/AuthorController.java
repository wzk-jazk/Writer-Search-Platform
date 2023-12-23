package com.group10.backend.controller;

import com.group10.backend.service.AuthorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthorController {
    @Resource
    private AuthorService authorService;
}
