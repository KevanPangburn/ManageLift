package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailAndPassword(String email, String password);

    @Query(value = """
    SELECT u.*
    FROM users u
    JOIN technician_customers tc ON u.id = tc.technician_id
    WHERE tc.customer_id = :customerId
    AND u.role = 'Technician'
""", nativeQuery = true)
    List<User> findTechniciansByCustomerId(@Param("customerId") Long customerId);



}
