package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.User;
import com.managelift.forkliftmanagement.repository.CustomerRepository;
import com.managelift.forkliftmanagement.repository.TechnicianCustomerRepository;
import com.managelift.forkliftmanagement.repository.TechnicianRepository;
import com.managelift.forkliftmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class TechnicianCustomerController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TechnicianCustomerRepository technicianCustomerRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @GetMapping("/{customerId}/technicians")
    public ResponseEntity<List<User>> getTechniciansForCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(userRepository.findTechniciansByCustomerId(customerId));
    }

    @PostMapping("/{customerId}/technicians/{techId}")
    public ResponseEntity<?> addTechnicianToCustomer(@PathVariable Long customerId, @PathVariable Long techId) {
        if (!technicianRepository.existsById(techId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Technician not found: " + techId);
        }
        customerRepository.assignTechnicianToCustomer(techId, customerId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{customerId}/technicians/{techId}")
    public ResponseEntity<?> removeTechnicianFromCustomer(@PathVariable Long customerId, @PathVariable Long techId) {
        technicianCustomerRepository.deleteByTechnicianIdAndCustomerId(techId, customerId);
        return ResponseEntity.noContent().build();
    }
}
