package com.example.springreact.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springreact.dto.LoginDTO;
import com.example.springreact.dto.UserDTO;
import com.example.springreact.entity.User;
import com.example.springreact.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean register(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return false;
        }
        
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        User user = new User(userDTO.getEmail(), hashedPassword);
        userRepository.save(user);
        return true;
    }

    public boolean login(LoginDTO loginDTO) {
        return userRepository.findByEmail(loginDTO.getEmail())
            .map(user -> passwordEncoder.matches(loginDTO.getPassword(), user.getPassword()))
            .orElse(false);
    }

}
