package com.managelift.forkliftmanagement.controller;

import com.managelift.forkliftmanagement.model.Forklift;
import com.managelift.forkliftmanagement.model.ForkliftDetailsDTO;
import com.managelift.forkliftmanagement.repository.ForkliftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/forklifts")
public class ForkliftController {

    @Autowired
    private ForkliftRepository forkliftRepository;

    @GetMapping
    public List<Forklift> getAllForklifts() {
        return forkliftRepository.findAll();
    }

    @PostMapping
    public Forklift createForklift(@RequestBody Forklift forklift) {
        return forkliftRepository.save(forklift);
    }

    @GetMapping("/{unitNumber}")
    public ResponseEntity<?> getForkliftWithCustomer(@PathVariable String unitNumber) {
        Optional<Forklift> forkliftOpt = forkliftRepository.findByUnitId(unitNumber);

        if (forkliftOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Forklift f = forkliftOpt.get();

        ForkliftDetailsDTO dto = new ForkliftDetailsDTO(
                f.getUnitId(),
                f.getMake(),
                f.getModel(),
                f.getSerialNumber(),
                f.getHourMeter(),
                f.getCustomer().getName(),
                f.getCustomer().getAddress(),
                f.getCustomer().getCity(),
                f.getCustomer().getState()
        );


        return ResponseEntity.ok(dto);
    }
}
