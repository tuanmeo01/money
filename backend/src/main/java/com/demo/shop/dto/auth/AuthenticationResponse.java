package com.demo.shop.dto.auth;

import com.demo.shop.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
