package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.MaintenanceFormDTO;
import com.managelift.forkliftmanagement.model.Forklift;
import com.managelift.forkliftmanagement.model.MaintenanceLog;
import com.managelift.forkliftmanagement.model.User;
import com.managelift.forkliftmanagement.repository.ForkliftRepository;
import com.managelift.forkliftmanagement.repository.MaintenanceLogRepository;
import com.managelift.forkliftmanagement.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/maintenance/form")
public class MaintenanceFormController {

    @Autowired
    private ForkliftRepository forkliftRepository;

    @Autowired
    private MaintenanceLogRepository maintenanceLogRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> handleMaintenanceForm(@RequestBody MaintenanceFormDTO formData) {

        Optional<Forklift> forkliftOpt;

        // Prefer forkliftId if available, fallback to unitId
        if (formData.getForkliftId() != null) {
            forkliftOpt = forkliftRepository.findById(formData.getForkliftId());
        } else {
            forkliftOpt = forkliftRepository.findByUnitId(formData.getUnitId());
        }

        if (forkliftOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Forklift not found.");
        }

        Optional<User> technicianOpt = userRepository.findById(formData.getTechnicianId());
        if (technicianOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Technician not found.");
        }

        Forklift forklift = forkliftOpt.get();
        User technician = technicianOpt.get();

        MaintenanceLog log = new MaintenanceLog();
        log.setForklift(forklift);
        log.setTechnician(technician);
        log.setDateStarted(LocalDate.parse(formData.getDateStarted()).atStartOfDay());
        log.setDateCompleted(LocalDate.parse(formData.getDateCompleted()).atStartOfDay());
        log.setHourMeter(formData.getHourMeter());
        log.setInspectionData(formData.getInspectionData());

        // Basic info
        log.setCustomerName(formData.getCustomerName());
        log.setCustomerPO(formData.getCustomerPO());
        log.setAddress(formData.getAddress());
        log.setCity(formData.getCity());
        log.setState(formData.getState());
        log.setUnitId(formData.getUnitId());
        log.setMake(formData.getMake());
        log.setModel(formData.getModel());
        log.setSerialNumber(formData.getSerialNumber());
        log.setDescription("Maintenance form submitted via frontend.");

        log.setTechnicianComments(formData.getTechnicianComments());
        log.setTechnicianSignature(formData.getTechnicianSignature());

        log.setCreatedAt(LocalDateTime.now());
        log.setUpdatedAt(LocalDateTime.now());

        maintenanceLogRepository.save(log);

        return ResponseEntity.ok("Maintenance log saved.");
    }
}
