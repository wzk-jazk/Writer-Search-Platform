package com.group10.backend.createEsIndex;

import org.apache.http.HttpHost;
import org.apache.http.client.config.RequestConfig;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class EsClient {
    public static RestHighLevelClient createClient() {
        // 设置连接超时和套接字超时
        int timeout = 10000; // 设置超时时间为 10 秒
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
                        .setRequestConfigCallback(
                                requestConfigBuilder -> requestConfigBuilder
                                        .setConnectTimeout(timeout)
                                        .setSocketTimeout(timeout)
                        )
        );
        return client;
    }
}
