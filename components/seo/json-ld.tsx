import React from 'react';

const JsonLd = () => {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Arun Krishna",
        "jobTitle": "Software Engineer",
        "url": "https://arunkrishnakt.netlify.app",
        "sameAs": [
            "https://github.com/a-humanthing",
            "https://www.linkedin.com/in/arunkrishnakt/",
            "https://www.instagram.com/a.humanthing"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Guidesly"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kerala",
            "addressCountry": "IN"
        },
        "knowsAbout": [
            "Software Engineering",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Redux",
            "NestJS",
            "Node.js",
            "MongoDB",
            "SQL",
            "Microservices",
            "Docker",
            "AWS",
            "GCP",
            "CI/CD"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Arun Krishna - Software Engineer",
        "url": "https://arunkrishnakt.netlify.app",
        "author": {
            "@type": "Person",
            "name": "Arun Krishna"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
};

export default JsonLd;
