package com.qzp.bid.global.config;

import org.assertj.core.api.Assertions;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@DisplayName("Jasypt 인코딩/디코딩용 테스트")
@ExtendWith(SpringExtension.class)
@TestPropertySource("classpath:application-key.yml")
class JasyptConfigTest {
    @Value("${jasypt.encryptor.key}")
    String key;
    @Test
    void jasypt() {
        String secret = "암호화시킬값";
        String s = jasyptEncrypt(secret);
        System.out.printf("%s -> %s\n", secret, s);
        Assertions.assertThat(secret).isEqualTo(jasyptDecryt(s));
    }

    private String jasyptEncrypt(String input) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.encrypt(input);
    }

    private String jasyptDecryt(String input) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.decrypt(input);
    }

}