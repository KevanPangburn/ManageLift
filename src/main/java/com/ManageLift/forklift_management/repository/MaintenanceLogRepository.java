package com.ManageLift.forklift_management.repository;

import com.ManageLift.forklift_management.model.MaintenanceLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {
}
