"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";
import {
  campusResources,
  resourceCategories,
} from "@/data/resources";

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let resources = campusResources;

    if (activeCategory !== "All") {
      resources = resources.filter((r) => r.category === activeCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      resources = resources.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.topics.some((t) => t.toLowerCase().includes(query)) ||
          r.category.toLowerCase().includes(query)
      );
    }

    return resources;
  }, [search, activeCategory]);

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="resources-page__header">
          <span className="pilot-badge">
            Pilot campus: Diablo Valley College
          </span>
          <h1 className="resources-page__title">Campus Resources</h1>
          <p className="resources-page__desc">
            Browse verified campus departments and support services. Each
            resource includes contact information, topics handled, and common
            documents you may need.
          </p>
        </div>

        <div className="resources-filters">
          <input
            type="search"
            className="resources-search"
            placeholder="Search resources by name, topic, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search resources"
          />
        </div>

        <div className="resources-categories" role="group" aria-label="Filter by category">
          {resourceCategories.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${activeCategory === cat ? "category-chip--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="resources-count">
          {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="var(--color-border)" strokeWidth="2" />
                <path d="M16 16l16 16M32 16L16 32" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="empty-state__title">No resources found</h2>
            <p className="empty-state__description">
              Try adjusting your search terms or selecting a different
              category.
            </p>
          </div>
        ) : (
          <div className="resource-grid">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
