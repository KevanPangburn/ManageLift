
package com.managelift.forkliftmanagement.controller;

public record OperatorSignupDTO(
        String name,
        String email,
        String password,
        Long customerId
) {}
