package com.group10.backend.createEsIndex;

import com.alibaba.fastjson.JSON;
import com.group10.backend.controller.AuthorController;
import com.group10.backend.entity.Author;
import com.group10.backend.service.AuthorService;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.common.xcontent.XContentType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CreateIndex {
    @Resource
    private AuthorService authorService;
    @Test
    public void createIndex() throws IOException {
        RestHighLevelClient client = EsClient.createClient();
        GetIndexRequest getRequest = new GetIndexRequest("author");
        if(client.indices().exists(getRequest, RequestOptions.DEFAULT)){
            DeleteIndexRequest deleteRequest = new DeleteIndexRequest("author");
            client.indices().delete(deleteRequest, RequestOptions.DEFAULT);
        }
        CreateIndexRequest createRequest = new CreateIndexRequest("author");
        String filePath = "./src/main/java/com/group10/backend/createEsIndex/IndexConfig.json";
        String indexString = JsonToString.convertJsonToString(filePath);
        createRequest.source(indexString, XContentType.JSON);
        client.indices().create(createRequest, RequestOptions.DEFAULT);
        List<Author> authorList = authorService.list();
        BulkRequest bulk = new BulkRequest();
        for (Author author : authorList) {
            IndexRequest request = new IndexRequest("author").id(Integer.toString(author.getId()));
            String json = JSON.toJSONString(author);
            request.source(json, XContentType.JSON);
            bulk.add(request);
        }
        client.bulk(bulk, RequestOptions.DEFAULT);
        client.close();
    }
}