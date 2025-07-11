package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.Forklift;
import com.managelift.forkliftmanagement.repository.ForkliftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forklifts")
public class ForkliftController {

    @Autowired
    private ForkliftRepository forkliftRepository;

    @GetMapping
    public List<Forklift> getAllForklifts() {
        return forkliftRepository.findAll();
    }
}
