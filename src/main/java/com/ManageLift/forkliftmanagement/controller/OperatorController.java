package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.Customer;
import com.managelift.forkliftmanagement.model.Operator;
import com.managelift.forkliftmanagement.model.User;
import com.managelift.forkliftmanagement.repository.CustomerRepository;
import com.managelift.forkliftmanagement.repository.OperatorRepository;
import com.managelift.forkliftmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/operators")
public class OperatorController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OperatorRepository operatorRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (req == null || isBlank(req.name) || isBlank(req.email) || isBlank(req.password) || req.customerId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "name, email, password, and customerId are required"));
        }

        if (userRepository.findByEmail(req.email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already in use"));
        }

        Customer customer = customerRepository.findById(req.customerId)
                .orElse(null);
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Customer not found: " + req.customerId));
        }

        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(req.password);
        user.setRole("Operator");
        user = userRepository.save(user);


        Operator op = new Operator(user, customer);
        op = operatorRepository.save(op);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Operator created",
                "userId", user.getId(),
                "operatorId", op.getId(),
                "customerId", customer.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }

    private static boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    public static class SignupRequest {
        public String name;
        public String email;
        public String password;
        public Long customerId;
    }
}
