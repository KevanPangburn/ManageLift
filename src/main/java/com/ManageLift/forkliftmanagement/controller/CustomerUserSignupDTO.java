package com.managelift.forkliftmanagement.controller;

public record CustomerUserSignupDTO(
        String name,
        String email,
        String password,
        Long customerId
) {}
