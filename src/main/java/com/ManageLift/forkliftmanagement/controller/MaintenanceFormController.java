package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.MaintenanceFormDTO;
import com.managelift.forkliftmanagement.model.Forklift;
import com.managelift.forkliftmanagement.model.MaintenanceLog;
import com.managelift.forkliftmanagement.repository.ForkliftRepository;
import com.managelift.forkliftmanagement.repository.MaintenanceLogRepository;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/maintenance/form")
public class MaintenanceFormController {

    @Autowired
    private ForkliftRepository forkliftRepository;

    @Autowired
    private MaintenanceLogRepository maintenanceLogRepository;

    @PostMapping
    public ResponseEntity<String> handleMaintenanceForm(@RequestBody MaintenanceFormDTO formData) {
        System.out.println("Received maintenance form for Unit ID: " + formData.getUnit_id());

        Optional<Forklift> forkliftOpt = forkliftRepository.findByUnitId(formData.getUnit_id());

        if (forkliftOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Forklift with Unit ID not found.");
        }

        Forklift forklift = forkliftOpt.get();

        MaintenanceLog log = new MaintenanceLog();
        log.setForklift(forklift);
        log.setDateStarted(LocalDate.parse(formData.getDate_started()).atStartOfDay());
        log.setDateCompleted(LocalDate.parse(formData.getDate_completed()).atStartOfDay());
        log.setHourMeter(formData.getHour_meter());
        log.setInspectionData(formData.getInspection_data());

        // Additional fields
        log.setCustomerName(formData.getCustomer_name());
        log.setCustomerPO(formData.getCustomer_po());
        log.setAddress(formData.getAddress());
        log.setCity(formData.getCity());
        log.setState(formData.getState());
        log.setUnitId(formData.getUnit_id());
        log.setMake(formData.getMake());
        log.setModel(formData.getModel());
        log.setSerialNumber(formData.getSerial_number());
        log.setDescription("Maintenance form submitted via frontend."); // Required field — adjust as needed

        // Optional
        log.setCreatedAt(LocalDateTime.now());
        log.setUpdatedAt(LocalDateTime.now());

        log.setTechnicianComments(formData.getTechnician_comments());
        log.setTechnicianSignature(formData.getTechnician_signature());

        maintenanceLogRepository.save(log);

        return ResponseEntity.ok("Maintenance log saved.");
    }

}
