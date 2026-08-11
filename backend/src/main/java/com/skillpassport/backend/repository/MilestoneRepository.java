package com.skillpassport.backend.repository;

import com.skillpassport.backend.entity.MilestoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends JpaRepository<MilestoneEntity, String> {
}
