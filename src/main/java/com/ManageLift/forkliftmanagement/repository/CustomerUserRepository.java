package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.CustomerUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerUserRepository extends JpaRepository<CustomerUser, Long> {
    boolean existsByUserId(Long userId);
    Optional<CustomerUser> findByUserId(Long userId);
}
