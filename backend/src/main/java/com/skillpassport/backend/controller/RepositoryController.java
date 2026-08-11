package com.skillpassport.backend.controller;

import com.skillpassport.backend.entity.RepositoryEntity;
import com.skillpassport.backend.repository.RepositoryItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/repositories")
public class RepositoryController {

    private final RepositoryItemRepository repositoryItemRepository;

    public RepositoryController(RepositoryItemRepository repositoryItemRepository) {
        this.repositoryItemRepository = repositoryItemRepository;
    }

    @GetMapping
    public ResponseEntity<List<RepositoryEntity>> getAllRepositories() {
        return ResponseEntity.ok(repositoryItemRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<RepositoryEntity> createRepository(@RequestBody RepositoryEntity repository) {
        if (repository.getId() == null || repository.getId().isEmpty()) {
            repository.setId("repo_" + UUID.randomUUID().toString().substring(0, 8));
        }
        RepositoryEntity saved = repositoryItemRepository.save(repository);
        return ResponseEntity.ok(saved);
    }
}
