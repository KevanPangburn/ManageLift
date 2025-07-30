package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.MaintenanceLog;
import com.managelift.forkliftmanagement.model.MaintenanceFormDTO;
import com.managelift.forkliftmanagement.model.Forklift;
import com.managelift.forkliftmanagement.model.User;
import com.managelift.forkliftmanagement.repository.ForkliftRepository;
import com.managelift.forkliftmanagement.repository.MaintenanceLogRepository;
import com.managelift.forkliftmanagement.repository.UserRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceLogController {

    @Autowired
    private MaintenanceLogRepository maintenanceLogRepository;

    @Autowired
    private ForkliftRepository forkliftRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createLog(@Valid @RequestBody MaintenanceFormDTO dto) {

        Map<String, String> inspection = dto.getInspectionData();

        // Validate foreign keys
        Optional<Forklift> forkliftOpt = forkliftRepository.findById(dto.getForkliftId());
        if (forkliftOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid forkliftId: " + dto.getForkliftId());
        }

        Optional<User> technicianOpt = userRepository.findById(dto.getTechnicianId());
        if (technicianOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid technicianId: " + dto.getTechnicianId());
        }

        MaintenanceLog log = new MaintenanceLog();
        log.setForklift(forkliftOpt.get());
        log.setTechnician(technicianOpt.get());

        log.setCustomerName(dto.getCustomerName());
        log.setCustomerPO(dto.getCustomerPO());
        log.setInspectionData(inspection);
        log.setAddress(dto.getAddress());
        log.setCity(dto.getCity());
        log.setState(dto.getState());
        log.setUnitId(dto.getUnitId());
        log.setMake(dto.getMake());
        log.setModel(dto.getModel());
        log.setSerialNumber(dto.getSerialNumber());
        log.setHourMeter(dto.getHourMeter());
        log.setDateStarted(parseDateOrNull(dto.getDateStarted()));
        log.setDateCompleted(parseDateOrNull(dto.getDateCompleted()));
        log.setDescription(dto.getDescription() != null ? dto.getDescription() : "Maintenance form submitted via frontend.");
        log.setTechnicianComments(dto.getTechnicianComments());
        log.setTechnicianSignature(dto.getTechnicianSignature());
        log.setCreatedAt(LocalDateTime.now());
        log.setUpdatedAt(LocalDateTime.now());

        MaintenanceLog savedLog = maintenanceLogRepository.save(log);
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping
    public List<MaintenanceLog> getAllLogs() {
        return maintenanceLogRepository.findAll();
    }

    private LocalDateTime parseDateOrNull(String dateStr) {
        try {
            return LocalDate.parse(dateStr).atStartOfDay();
        } catch (Exception e) {
            return null;
        }
    }
}
