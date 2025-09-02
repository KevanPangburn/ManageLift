package com.managelift.forkliftmanagement.repository;

import com.managelift.forkliftmanagement.model.Technician;
import com.managelift.forkliftmanagement.model.TechnicianPickItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TechnicianRepository extends JpaRepository<Technician, Long> {

    @Query("select t from Technician t where t.user.id = :userId")
    Optional<Technician> findByUserId(@Param("userId") Long userId);

    @Query(value = """
        SELECT t.id   AS technicianId,
               u.id   AS userId,
               u.name AS name,
               u.email AS email
        FROM technicians t
        JOIN users u ON u.id = t.user_id
        ORDER BY u.name
        """, nativeQuery = true)
    List<TechnicianPickItem> findAllForPicklist();
}
