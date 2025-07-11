package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {
}
