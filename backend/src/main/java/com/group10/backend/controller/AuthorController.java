package com.group10.backend.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.group10.backend.createEsIndex.EsClient;
import com.group10.backend.entity.Author;
import com.group10.backend.entity.SearchRecord;
import com.group10.backend.request.SearchReq;
import com.group10.backend.service.AuthorService;
import com.group10.backend.service.SearchRecordService;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.Console;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthorController {
    @Resource
    private AuthorService authorService;
    @Resource
    private SearchRecordService searchRecordService;
    @PostMapping("/lowSearch")
    public List<Author> lowSearch(@RequestBody Author author){
        try{
            RestHighLevelClient client = EsClient.createClient();
            SearchRequest request = new SearchRequest("author");

            SearchSourceBuilder builder = new SearchSourceBuilder();
            builder.query(QueryBuilders.matchQuery("name", author.getName()));
            request.source(builder);

            SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            SearchHits hits = response.getHits();
            List<Author> result = new ArrayList<>();
            for (SearchHit hit : hits) {
                String source = hit.getSourceAsString();
                //System.out.println(source);
                result.add(JSON.parseObject(source, Author.class));
            }
            for (Author value : result) {
                QueryWrapper<SearchRecord> queryWrapper = new QueryWrapper<SearchRecord>();
                long total = searchRecordService.count(queryWrapper);
                System.out.println("total: " + total);
                queryWrapper.eq("authorID", value.getId());
                long count = searchRecordService.count(queryWrapper);
                System.out.println("count:" + count);
                if (count == 0) {
                    SearchRecord searchRecord = new SearchRecord();
                    searchRecord.setRecordId((int) (total + 1));
                    searchRecord.setAuthorId(value.getId());
                    searchRecord.setNum(1);
                    searchRecordService.save(searchRecord);
                } else {
                    SearchRecord searchRecord = searchRecordService.getOne(queryWrapper);
                    searchRecord.setNum(searchRecord.getNum() + 1);
                    searchRecordService.update(searchRecord, queryWrapper);
                }
            }
            System.out.println(result);
            return result;
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return null;
        }
    }
    @PostMapping("/highSearch")
    public List<Author> highSearch(@RequestBody SearchReq searchReq){
        System.out.println(searchReq);
        try{
            RestHighLevelClient client = EsClient.createClient();
            SearchRequest request = new SearchRequest("author");
            BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
            SearchSourceBuilder builder = new SearchSourceBuilder();
            if(searchReq.getProvence() != null)
            {
                if(searchReq.getProvence().length() > 0)
                {
                    System.out.println("!!!!!!!!!!Province!!!!!!!!!!");
                    MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("province", searchReq.getProvence());
                    boolQuery.filter(matchQueryBuilder);
                }
            }
            if(searchReq.getCity() != null)
            {
                if(searchReq.getCity().length() > 0)
                {
                    System.out.println("!!!!!!!!!!City!!!!!!!!!!");
                    MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("city", searchReq.getCity());
                    boolQuery.filter(matchQueryBuilder);
                }
            }
            if(searchReq.getStyle() != null)
            {
                if(searchReq.getStyle().length() > 0)
                {
                    System.out.println("!!!!!!!!!!Style!!!!!!!!!!");
                    MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("writingStyle", searchReq.getStyle());
                    boolQuery.filter(matchQueryBuilder);
                }
            }
            if(searchReq.getSchool() != null)
            {
                if(searchReq.getSchool().length() > 0)
                {
                    System.out.println("!!!!!!!!!!school!!!!!!!!!!!!!!");
                    MatchQueryBuilder matchQueryBuilder = QueryBuilders.matchQuery("school", searchReq.getSchool());
                    boolQuery.filter(matchQueryBuilder);
                }
            }
            if(searchReq.getAgeFrom() != 0 || searchReq.getAgeTo() != 0)
            {
                RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("age");
                rangeQuery.gte(searchReq.getAgeFrom());
                rangeQuery.lte(searchReq.getAgeTo());
                boolQuery.filter(rangeQuery);
            }
            builder.query(boolQuery);
            request.source(builder);

            SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            SearchHits hits = response.getHits();
            List<Author> result = new ArrayList<>();
            for (SearchHit hit : hits) {
                String source = hit.getSourceAsString();
                //System.out.println(source);
                result.add(JSON.parseObject(source, Author.class));
            }
            System.out.println(result);
            List<Author> resAfterFilter = new ArrayList<>();
            if(searchReq.getBirthDateFrom() != null && searchReq.getBirthDateTo() != null)
            {
                for (Author author : result) {
                    Date birthDate = new Date(author.getBirthDate());
                    if (birthDate.getTime() > searchReq.getBirthDateTo().getTime() || birthDate.getTime() < searchReq.getBirthDateFrom().getTime()) {
                        continue;
                    }
                    resAfterFilter.add(author);
                }
                System.out.println(resAfterFilter);
                return resAfterFilter;
            }
            return result;
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
