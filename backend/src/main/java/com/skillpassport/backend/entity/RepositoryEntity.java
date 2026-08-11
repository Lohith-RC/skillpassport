package com.skillpassport.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "repositories")
public class RepositoryEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String fullName;
    private String platform;

    @Column(length = 1000)
    private String description;

    private Integer stars = 0;
    private Integer forks = 0;
    private Integer commitsCount = 0;
    private Integer mrsCount = 0;
    private String buildTime;
    private String status;

    private String tags; // Comma separated tags

    private String liveUrl;

    @Column(length = 1000)
    private String architectureDetails;

    public RepositoryEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getStars() { return stars; }
    public void setStars(Integer stars) { this.stars = stars; }

    public Integer getForks() { return forks; }
    public void setForks(Integer forks) { this.forks = forks; }

    public Integer getCommitsCount() { return commitsCount; }
    public void setCommitsCount(Integer commitsCount) { this.commitsCount = commitsCount; }

    public Integer getMrsCount() { return mrsCount; }
    public void setMrsCount(Integer mrsCount) { this.mrsCount = mrsCount; }

    public String getBuildTime() { return buildTime; }
    public void setBuildTime(String buildTime) { this.buildTime = buildTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getArchitectureDetails() { return architectureDetails; }
    public void setArchitectureDetails(String architectureDetails) { this.architectureDetails = architectureDetails; }
}
