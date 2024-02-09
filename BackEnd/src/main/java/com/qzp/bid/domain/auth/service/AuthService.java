package com.qzp.bid.domain.auth.service;

import com.qzp.bid.domain.auth.dto.LoginTokenRes;
import com.qzp.bid.domain.auth.dto.OAuthLoginReq;

public interface AuthService {

    LoginTokenRes loginOauth(OAuthLoginReq loginReq);
}
