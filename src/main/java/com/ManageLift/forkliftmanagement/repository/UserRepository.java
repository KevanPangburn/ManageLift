package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByEmailAndPassword(String email, String password);

    @Query(value = """
        SELECT u.*
        FROM users u
        JOIN technicians t
          ON t.user_id = u.id
        JOIN technician_customers tc
          ON tc.technician_id = t.id
        WHERE tc.customer_id = :customerId
        """,
            nativeQuery = true)
    List<User> findTechniciansByCustomerId(@Param("customerId") Long customerId);
}
