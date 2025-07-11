package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.MaintenanceLog;
import com.managelift.forkliftmanagement.repository.MaintenanceLogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceLogController {

    @Autowired
    private MaintenanceLogRepository maintenanceLogRepository;

    @PostMapping
    public MaintenanceLog createLog(@RequestBody MaintenanceLog log) {
        return maintenanceLogRepository.save(log);
    }

    @GetMapping
    public List<MaintenanceLog> getAllLogs() {
        return maintenanceLogRepository.findAll();
    }
}
