package com.example.springreact.controller;

import com.example.springreact.security.JwtUtil;
import com.example.springreact.security.UserPrincipal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springreact.dto.LoginDTO;
import com.example.springreact.dto.UserDTO;
import com.example.springreact.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        boolean success = userService.register(userDTO);
        if (success) {
            return ResponseEntity.ok("User Registered Successfully!");
        } else {
            return ResponseEntity.badRequest().body("Email already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        boolean success = userService.login(loginDTO);
        if (!success) {
            return ResponseEntity.status(401).body("Invalid credentials");
        } 
        
        String token = jwtUtil.generateToken(loginDTO.getEmail());
        
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserPrincipal user) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("email", user.getUsername());
        return ResponseEntity.ok(response);
    }

}
