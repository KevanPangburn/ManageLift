package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(value = """
        SELECT c.*
        FROM customers c
        JOIN technician_customers tc ON c.id = tc.customer_id
        WHERE tc.technician_id = :technicianId
    """, nativeQuery = true)
    List<Customer> findCustomersByTechnicianId(@Param("technicianId") Long technicianId);
}
