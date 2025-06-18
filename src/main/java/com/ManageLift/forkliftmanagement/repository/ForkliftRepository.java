package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.Forklift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForkliftRepository extends JpaRepository<Forklift, Long> {
}
