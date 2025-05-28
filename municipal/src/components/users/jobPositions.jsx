import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, Calendar, Clock, Loader2, AlertCircle } from "lucide-react";
import "./jobPositions.css";
import { useNavigate } from "react-router-dom";

// Fallback static data in case API fails
const fallbackJobsData = [
  {
    id: 1,
    title: "City Planner",
    location: "City Hall, Downtown",
    department: "Urban Development",
    summary: "Join our urban planning team to help shape the future of our city through sustainable development and community-focused design.",
    posted: "2 days ago",
    type: "Full-Time",
    reference: "CP-001/2025"
  },
  {
    id: 2,
    title: "Environmental Specialist",
    location: "Environmental Center",
    department: "Environmental Services",
    summary: "Lead environmental initiatives and develop sustainability programs to protect our natural resources.",
    posted: "5 days ago",
    type: "Full-Time",
    reference: "ES-002/2025"
  },
  {
    id: 3,
    title: "Administrative Assistant",
    location: "Public Works Building",
    department: "Public Works",
    summary: "Provide administrative support, manage scheduling, and assist with departmental reports and communications.",
    posted: "1 day ago",
    type: "Part-Time",
    reference: "AA-003/2025"
  }
];

const filters = ["All Jobs", "Full-Time", "Part-Time", "Contract"];

const JobPositions = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper function to clean HTML from SharePoint rich text fields
  const cleanHtmlContent = (htmlString) => {
    if (!htmlString) return '';

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Extract plain text and clean up
    let text = tempDiv.textContent || tempDiv.innerText || '';

    // Remove extra whitespace and line breaks
    text = text.replace(/\s+/g, ' ').trim();

    return text;
  };

  // Helper function to format closing date
  const formatClosingDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'Closed';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays <= 7) {
      return `${diffDays} days`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Function to handle application navigation with job data
  const handleApplyClick = (job) => {
    const jobData = {
      category: job.category || '',
      reference: job.reference || '',
      title: job.title || '',
      department: job.department || '',
      position: job.title || '' // Using title as position as well
    };

    if(job.category.toLowerCase() === 'standard') {
    // Navigate to application form with job data as state
    navigate("/apply-standard", { 
      state: { 
        jobData: jobData,
        fromJobListing: true 
      } 
    });
  } else if (job.category.toLowerCase() === 'senior') {
      // Navigate to senior management application form with job data as state
      navigate("/apply-senior", { 
        state: { 
          jobData: jobData,
          fromJobListing: true 
        } 
      });
    }
  };

  // Fetch jobs from SharePoint on component mount
  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://erecruitment-backend-aghxfgbqayf0atcr.southafricanorth-01.azurewebsites.net/vacancy_api.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Clean up the data before setting it
        const cleanedData = result.data.map(job => ({
          ...job,
          summary: cleanHtmlContent(job.summary),
          // Ensure id is treated as string for consistency
          id: String(job.id)
        }));
        setJobsData(cleanedData);
      } else {
        throw new Error(result.error || 'Failed to fetch vacancies');
      }
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      setError(err.message);
      // Use fallback data if API fails
      setJobsData(fallbackJobsData);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobsData.filter((job) => {
    const matchType = activeFilter === "All Jobs" || job.type === activeFilter;
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  if (loading) {
    return (
      <section className="job-section">
        <div className="job-container">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Loading available positions...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="job-section">
      <div className="job-container">
        <div className="job-header">
          <h2 className="job-title">Open Positions</h2>
          <p className="job-subtitle">
            Find your perfect role in our growing municipality
          </p>
          {error && (
            <div className="flex items-center text-orange-600 text-sm mt-2">
              <AlertCircle size={16} className="mr-1" />
              <span>Using cached data - {error}</span>
            </div>
          )}
        </div>

        <div className="job-controls">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="job-search-input flex-1 mr-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={fetchVacancies}
              className="btn-refresh"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Refresh"}
            </button>
          </div>

          <div className="job-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn ${activeFilter === filter ? "filter-active" : ""
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="job-list">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
              <p>No positions found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="job-position">{job.title}</h3>
                    {job.reference && (
                      <span className="text-sm text-gray-500 font-mono">
                        Ref: {job.reference}
                      </span>
                    )}
                  </div>
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
                  <div className="flex justify-between items-center mt-3">
                    <div className="job-posted">
                      <Calendar size={14} />
                      <span>Posted {job.posted}</span>
                    </div>
                    {job.closingDate && (
                      <div className="job-posted text-red-600">
                        <Clock size={14} />
                        <span>Closes {formatClosingDate(job.closingDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="job-actions">
                  <span className="badge-type">{job.type}</span>
                  <button
                    className="btn-green"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JobPositions;