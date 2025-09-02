package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.Technician;
import com.managelift.forkliftmanagement.model.TechnicianPickItem;
import com.managelift.forkliftmanagement.model.User;
import com.managelift.forkliftmanagement.repository.TechnicianRepository;
import com.managelift.forkliftmanagement.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/technicians")
public class TechnicianController {

    private final TechnicianRepository technicianRepository;
    private final UserRepository userRepository;

    public TechnicianController(TechnicianRepository technicianRepository,
                                UserRepository userRepository) {
        this.technicianRepository = technicianRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/picklist")
    public List<TechnicianPickItem> picklist() {
        return technicianRepository.findAllForPicklist();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        // phone is optional for now

        if (name == null || name.isBlank() || email == null || email.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Missing required fields"));
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already in use"));
        }

        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(password);
        u.setRole("Technician");
        userRepository.save(u);

        Technician t = new Technician();
        t.setUser(u);
        technicianRepository.save(t);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", u.getId(), "message", "Technician account created"));
    }

}
