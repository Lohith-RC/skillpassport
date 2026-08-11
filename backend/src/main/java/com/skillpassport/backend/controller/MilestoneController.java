package com.skillpassport.backend.controller;

import com.skillpassport.backend.entity.MilestoneEntity;
import com.skillpassport.backend.repository.MilestoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/milestones")
public class MilestoneController {

    private final MilestoneRepository milestoneRepository;

    public MilestoneController(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    @GetMapping
    public ResponseEntity<List<MilestoneEntity>> getAllMilestones() {
        return ResponseEntity.ok(milestoneRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<MilestoneEntity> createMilestone(@RequestBody MilestoneEntity milestone) {
        if (milestone.getId() == null || milestone.getId().isEmpty()) {
            milestone.setId("m_" + UUID.randomUUID().toString().substring(0, 8));
        }
        MilestoneEntity saved = milestoneRepository.save(milestone);
        return ResponseEntity.ok(saved);
    }
}
