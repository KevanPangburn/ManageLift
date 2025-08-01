package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {


    List<MaintenanceLog> findByForkliftId(Long forkliftId);

}