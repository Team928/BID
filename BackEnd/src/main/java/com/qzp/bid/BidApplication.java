package com.qzp.bid;

import jakarta.annotation.PostConstruct;
import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BidApplication {

    public static void main(String[] args) {
        SpringApplication.run(BidApplication.class, args);
    }

    @PostConstruct // Bean 생명주기를 이용한 timezone 설정
    public void started() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

}
