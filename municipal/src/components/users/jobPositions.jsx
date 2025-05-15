import React, { useState } from "react";
import "./jobPositions.css";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const jobsData = [
  {
    id: 1,
    title: "City Planner",
    location: "City Hall, Downtown",
    department: "Urban Development",
    summary:
      "Join our urban planning team to help shape the future of our city through sustainable development and community-focused design.",
    posted: "2 days ago",
    type: "Full-Time",
  },
  {
    id: 2,
    title: "Environmental Specialist",
    location: "Environmental Center",
    department: "Environmental Services",
    summary:
      "Lead environmental initiatives and develop sustainability programs to protect our natural resources.",
    posted: "5 days ago",
    type: "Full-Time",
  },
  {
    id: 3,
    title: "Administrative Assistant",
    location: "Public Works Building",
    department: "Public Works",
    summary:
      "Provide administrative support, manage scheduling, and assist with departmental reports and communications.",
    posted: "1 day ago",
    type: "Part-Time",
  },
  {
    id: 4,
    title: "IT Support Technician",
    location: "Technology Services Center",
    department: "Information Technology",
    summary:
      "Troubleshoot and resolve technical issues for staff, maintain hardware/software, and support internal systems.",
    posted: "3 days ago",
    type: "Contract",
  },
  {
    id: 5,
    title: "Parks and Recreation Coordinator",
    location: "Community Park Office",
    department: "Recreation",
    summary:
      "Plan and coordinate community recreation programs, events, and facility usage.",
    posted: "4 days ago",
    type: "Part-Time",
  },
  {
    id: 6,
    title: "Civil Engineer",
    location: "Infrastructure Division",
    department: "Engineering",
    summary:
      "Design, oversee, and evaluate municipal construction projects including roads and drainage systems.",
    posted: "2 days ago",
    type: "Full-Time",
  },
  {
    id: 7,
    title: "Public Health Educator",
    location: "Health Department",
    department: "Public Health",
    summary:
      "Develop and implement health education campaigns to promote wellness and disease prevention.",
    posted: "6 days ago",
    type: "Contract",
  }
];

const filters = ["All Jobs", "Full-Time", "Part-Time", "Contract"];

const JobPositions = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Jobs");

  const filteredJobs = jobsData.filter((job) => {
    const matchType =
      activeFilter === "All Jobs" || job.type === activeFilter;
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <section className="job-section">
      <div className="job-container">
        <div className="job-header">
          <h2 className="job-title">Open Positions</h2>
          <p className="job-subtitle">
            Find your perfect role in our growing municipality
          </p>
        </div>

        <div className="job-controls">
          <input
            type="text"
            placeholder="Search jobs..."
            className="job-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="job-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn ${
                  activeFilter === filter ? "filter-active" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="job-list">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <h3 className="job-position">{job.title}</h3>
                <div className="job-meta">
                  <span className="job-icon">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span className="job-icon">
                    <Briefcase size={16} />
                    {job.department}
                  </span>
                </div>
                <p className="job-summary">{job.summary}</p>
                <div className="job-posted">
                  <Calendar size={14} />
                  <span>Posted {job.posted}</span>
                </div>
              </div>

              <div className="job-actions">
                <span className="badge-type">{job.type}</span>
                <button className="btn-green">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobPositions;
