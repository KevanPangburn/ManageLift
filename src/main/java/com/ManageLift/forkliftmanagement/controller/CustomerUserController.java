package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.Customer;
import com.managelift.forkliftmanagement.model.CustomerUser;
import com.managelift.forkliftmanagement.model.User;
import com.managelift.forkliftmanagement.repository.CustomerRepository;
import com.managelift.forkliftmanagement.repository.CustomerUserRepository;
import com.managelift.forkliftmanagement.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/customer-users")
public class CustomerUserController {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final CustomerUserRepository customerUserRepository;

    public CustomerUserController(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            CustomerUserRepository customerUserRepository
    ) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.customerUserRepository = customerUserRepository;
    }

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<?> signup(@RequestBody CustomerUserSignupDTO req) {
        if (userRepository.findByEmail(req.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already in use"));
        }

        Customer customer = customerRepository.findById(req.customerId())
                .orElse(null);
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid customerId"));
        }

        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setPassword(req.password());
        user.setRole("Customer");
        user = userRepository.save(user);

        CustomerUser cu = new CustomerUser(user, customer);
        cu = customerUserRepository.save(cu);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Customer user created",
                "userId", user.getId(),
                "customerUserId", cu.getId(),
                "customerId", customer.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }
}
