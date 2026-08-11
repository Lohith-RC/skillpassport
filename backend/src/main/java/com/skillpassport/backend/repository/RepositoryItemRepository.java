package com.skillpassport.backend.repository;

import com.skillpassport.backend.entity.RepositoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryItemRepository extends JpaRepository<RepositoryEntity, String> {
}
