package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO technician_customers (technician_id, customer_id) VALUES (:techId, :customerId) ON CONFLICT DO NOTHING", nativeQuery = true)
    void assignTechnicianToCustomer(@Param("techId") Long techId, @Param("customerId") Long customerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM technician_customers WHERE technician_id = :techId AND customer_id = :customerId", nativeQuery = true)
    void removeTechnicianFromCustomer(@Param("techId") Long techId, @Param("customerId") Long customerId);
}
