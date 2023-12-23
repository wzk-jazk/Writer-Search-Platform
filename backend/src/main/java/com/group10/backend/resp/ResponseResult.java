package com.group10.backend.resp;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseResult<T> {

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 返回信息
     */
    private String message;

    /**
     * 数据
     */
    private T data;

    private static <T> ResponseResult<T> response(Integer code, String message, T data) {
        ResponseResult<T> responseResult = new ResponseResult<>();
        responseResult.setCode(code);
        responseResult.setMessage(message);
        responseResult.setData(data);
        return responseResult;
    }

    private static <T> ResponseResult<T> response(Integer code, String message) {
        ResponseResult<T> responseResult = new ResponseResult<>();
        responseResult.setCode(code);
        responseResult.setMessage(message);
        return responseResult;
    }

    public static <T> ResponseResult<T> success(T data){
        return response(200, "操作成功", data);
    }

    public static <T> ResponseResult<T> success(String message, T data){
        return response(200, message, data);
    }

    public static <T> ResponseResult<T> fail(){
        return response(0, "系统内部错误", null);
    }

    public static <T> ResponseResult<T> fail(String message){
        return response(0, message, null);
    }


}