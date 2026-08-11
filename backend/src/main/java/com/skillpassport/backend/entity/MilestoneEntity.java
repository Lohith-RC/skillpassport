package com.skillpassport.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "milestones")
public class MilestoneEntity {

    @Id
    private String id;

    @Column(name = "milestone_year")
    private String year;
    private String title;
    private String category;

    @Column(length = 1000)
    private String description;

    private String proofBadge;
    private String shaSeal;
    private String icon;
    private String color;

    public MilestoneEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProofBadge() { return proofBadge; }
    public void setProofBadge(String proofBadge) { this.proofBadge = proofBadge; }

    public String getShaSeal() { return shaSeal; }
    public void setShaSeal(String shaSeal) { this.shaSeal = shaSeal; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}
