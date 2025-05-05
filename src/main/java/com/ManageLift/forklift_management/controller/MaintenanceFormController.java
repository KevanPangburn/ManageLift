package com.ManageLift.forklift_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MaintenanceFormController {

    @GetMapping("/maintenance_form")
    public String showMaintenanceForm() {
        return "maintenance_form";
    }
}
