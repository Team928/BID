package com.qzp.bid.global.result.error.exception;

import com.nimbusds.jose.shaded.gson.Gson;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.MediaType;

public class TokenException extends BusinessException{

    public TokenException(){
        super(ErrorCode.JWT_MALFORM);
    }

    public TokenException(ErrorCode errorCode) {
        super(errorCode);
    }

    public void sendResponseError(HttpServletResponse response){
        response.setStatus(this.getErrorCode().getStatus());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");

        final ErrorCode errorCode = this.getErrorCode();
        final ErrorResponse errorResponse = ErrorResponse.of(errorCode, this.getErrors());
        Gson gson = new Gson();

        try {
            response.getWriter().println(gson.toJson(errorResponse));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
