package com.group10.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.group10.backend.entity.SearchRecord;
import com.group10.backend.mapper.SearchRecordMapper;
import com.group10.backend.service.SearchRecordService;
import org.springframework.stereotype.Service;

@Service
public class SearchRecordServiceImpl extends ServiceImpl<SearchRecordMapper, SearchRecord> implements SearchRecordService {
}
