package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.Forklift;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ForkliftRepository extends JpaRepository<Forklift, Long> {
    Optional<Forklift> findByUnitId(String unitNumber);
}
