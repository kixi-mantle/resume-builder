import { Template_1_type } from "../resumeSchema";

export default function Template_body({ data }: { data: Template_1_type }) {
  return (
    <div style={{ 
      backgroundColor: "#ffffff", 
      width: "100%", 
      height: "100%", 
      aspectRatio: "8.5/11",
      padding: "2rem 3rem",
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      fontSize: "10.5pt",
      lineHeight: 1.5,
      color: "#374151"
    }}>
      
      {/* Header Section */}
      <header style={{ 
        display: "flex",
        alignItems: "center",
        marginBottom: "1.75rem",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid #f0f0f0"
      }}>
        {data.photo && (
          <div style={{ 
            width: "90px", 
            height: "90px", 
            borderRadius: "8px", 
            overflow: "hidden",
            marginRight: "1.75rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <img
              src={data.photo}
              alt="Profile"
              width={90}
              height={90}
              style={{ 
                objectFit: "cover", 
                width: "100%", 
                height: "100%",
                filter: "grayscale(20%)"
              }}
            />
          </div>
        )}
        
        <div>
          <h1 style={{ 
            fontSize: "24pt", 
            fontWeight: 700, 
            color: "#111827",
            margin: "0 0 0.25rem 0",
            letterSpacing: "-0.5px"
          }}>
            {data.name}
          </h1>
          <h2 style={{ 
            fontSize: "14pt", 
            fontWeight: 600, 
            color: "#4b5563",
            margin: "0 0 0.75rem 0",
            fontStyle: "normal"
          }}>
            {data.occupation}
          </h2>
          <div style={{ 
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "9.5pt",
            color: "#6b7280"
          }}>
            {data.address && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg style={{ width: "12px", height: "12px", marginRight: "4px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {data.address}
              </div>
            )}
            {data.phone && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg style={{ width: "12px", height: "12px", marginRight: "4px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {data.phone}
              </div>
            )}
            {data.email && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg style={{ width: "12px", height: "12px", marginRight: "4px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {data.email}
              </div>
            )}
            {data.website && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg style={{ width: "12px", height: "12px", marginRight: "4px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {data.website}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {data.summary && (
          <section style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ 
              fontSize: "12.5pt", 
              fontWeight: 700, 
              color: "#111827",
              marginBottom: "0.75rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              position: "relative",
              paddingBottom: "6px",
              display: "inline-block"
            }}>
              Summary
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3b82f6"
              }}></span>
            </h2>
            <div style={{ 
              color: "#4b5563",
              fontSize: "10.5pt",
              lineHeight: 1.6
            }} dangerouslySetInnerHTML={{ __html: data.summary }} />
          </section>
        )}

        {data.experience.length > 0 && (
          <section style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ 
              fontSize: "12.5pt", 
              fontWeight: 700, 
              color: "#111827",
              marginBottom: "0.75rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              position: "relative",
              paddingBottom: "6px",
              display: "inline-block"
            }}>
              Professional Experience
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3b82f6"
              }}></span>
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} style={{ 
                marginBottom: "1.25rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ 
                    fontSize: "11pt", 
                    fontWeight: 600, 
                    color: "#111827",
                    margin: "0 0 0.25rem 0"
                  }}>
                    {exp.company}
                  </h3>
                  <span style={{ 
                    fontSize: "9.5pt", 
                    color: "black",
                    fontWeight: 600,
                    
                  }}>
                    {exp.date}
                  </span>
                </div>
                <p style={{ 
                  fontSize: "10.5pt", 
                  fontWeight: 500, 
                  color: "#4b5563",
                  fontStyle: "italic",
                  margin: "0 0 0.5rem 0"
                }}>
                  {exp.position}
                </p>
                <div style={{ 
                  color: "#4b5563",
                  fontSize: "10pt",
                  lineHeight: 1.6
                }} dangerouslySetInnerHTML={{ __html: exp.achievements }} />
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ 
              fontSize: "12.5pt", 
              fontWeight: 700, 
              color: "#111827",
              marginBottom: "0.75rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              position: "relative",
              paddingBottom: "6px",
              display: "inline-block"
            }}>
              Education
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3b82f6"
              }}></span>
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} style={{ 
                marginBottom: "1rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ 
                    fontSize: "11pt", 
                    fontWeight: 600, 
                    color: "#111827",
                    margin: "0 0 0.25rem 0"
                  }}>
                    {edu.institution}
                  </h3>
                  <span style={{ 
                     fontSize: "9.5pt", 
                    color: "black",
                    fontWeight: 600,
                  }}>
                    {edu.date}
                  </span>
                </div>
                <p style={{ 
                  fontSize: "10.5pt", 
                  color: "#4b5563",
                  margin: "0",
                  fontStyle: "italic"
                }}>
                  {edu.degree}
                </p>
              </div>
            ))}
          </section>
        )}

        {data.additionalInfo && (
          <section>
            <h2 style={{ 
              fontSize: "12.5pt", 
              fontWeight: 700, 
              color: "#111827",
              marginBottom: "0.75rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              position: "relative",
              paddingBottom: "6px",
              display: "inline-block"
            }}>
              Additional Information
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3b82f6"
              }}></span>
            </h2>
            <div style={{ 
              color: "#4b5563",
              fontSize: "10pt",
              lineHeight: 1.6
            }} dangerouslySetInnerHTML={{ __html: data.additionalInfo }} />
          </section>
        )}

      </main>
    </div>
  );
}