package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.TechnicianCustomer;
import com.managelift.forkliftmanagement.model.TechnicianCustomerId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TechnicianCustomerRepository extends CrudRepository<TechnicianCustomer, TechnicianCustomerId> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM technician_customers WHERE technician_id = :techId AND customer_id = :customerId", nativeQuery = true)
    void deleteByTechnicianIdAndCustomerId(Long techId, Long customerId);
}
