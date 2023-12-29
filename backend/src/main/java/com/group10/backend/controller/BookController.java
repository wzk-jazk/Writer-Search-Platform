package com.group10.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.group10.backend.entity.Book;
import com.group10.backend.service.BookService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("")
@CrossOrigin
public class BookController {
    @Resource
    private BookService bookService;
    @GetMapping("/getBooks")
    public List<Book> getBooks(@RequestParam("id") String authorId) {
        QueryWrapper<Book> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("title", "BriefIntroduction", "LiteraryGenres", "source", "honors", "publicationYear");
        queryWrapper.eq("authorID", authorId);
        return bookService.list(queryWrapper);
    }

}
