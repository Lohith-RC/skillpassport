package com.skillpassport.backend.entity;

/**
 * Enum defining valid user roles in the SkillPassport system.
 * Prevents privilege escalation via free-text role assignment.
 */
public enum UserRole {
    STUDENT,
    DEVELOPER,
    COMPANY,
    UNIVERSITY,
    INVESTOR,
    RECRUITER,
    REGISTRAR
}
