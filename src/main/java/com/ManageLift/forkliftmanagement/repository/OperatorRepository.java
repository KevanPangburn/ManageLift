package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.Operator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OperatorRepository extends JpaRepository<Operator, Long> {
    boolean existsByUser_Id(Long userId);
    Optional<Operator> findByUser_Id(Long userId);
}
