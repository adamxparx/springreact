package com.example.springreact.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.springreact.dto.LoginDTO;
import com.example.springreact.dto.UserDTO;
import com.example.springreact.entity.User;
import com.example.springreact.repository.UserRepository;

@Service
public class UserService {
    
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

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
        User user = userRepository.findByEmail(loginDTO.getEmail());
        
        if (user == null) {
            return false;
        }

        return passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
    }

}
