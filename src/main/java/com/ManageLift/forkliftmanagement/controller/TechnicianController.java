package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.TechnicianPickItem;
import com.managelift.forkliftmanagement.repository.TechnicianRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technicians")
public class TechnicianController {

    private final TechnicianRepository technicianRepository;

    public TechnicianController(TechnicianRepository technicianRepository) {
        this.technicianRepository = technicianRepository;
    }

    @GetMapping("/picklist")
    public List<TechnicianPickItem> picklist() {
        return technicianRepository.findAllForPicklist();
    }
}
