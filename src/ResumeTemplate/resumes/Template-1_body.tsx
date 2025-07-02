import Image from "next/image";
import { Template_1_type } from "../resumeSchema";

export default function Template_body({ data }: { data: Template_1_type }) {
  return (
    <div style={{ 
      backgroundColor: "#ffffff", 
      width: "100%", 
      height: "100%", 
      aspectRatio: "8.5/11", // Standard US letter ratio
      padding: "1.5rem 3rem",
      fontFamily: "'Helvetica', 'Arial', sans-serif",
      fontSize: "11pt",
      lineHeight: 1.4,
      color: "#333333"
    }}>
      
      {/* Header Section */}
      <header style={{ 
        display: "flex",
        alignItems: "center",
        marginBottom: "1.5rem",
        paddingBottom: "1rem",
      }}>
        {data.photo && (
          <div style={{ 
            width: "100px", 
            height: "100px", 
            borderRadius: "50%", 
            overflow: "hidden",
            marginRight: "1.5rem",
            border: "3px solid #f0f0f0"
          }}>
            <Image
              src={data.photo}
              alt="Profile"
              width={100}
              height={100}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        )}
        
        <div>
          <h1 style={{ 
            fontSize: "22pt", 
            fontWeight: 600, 
            color: "#2c3e50",
            margin: "0 0 0"
          }}>
            {data.name}
          </h1>
          <h2 style={{ 
            fontSize: "16pt", 
            fontWeight: 600, 
            color: "#555555",
            margin: "0",
            fontStyle: "italic"
          }}>
            {data.occupation}
          </h2>
          <div style={{ color: "#555555", fontSize: "10pt" }}>
            <p style={{ margin: "0.1rem 0" }}>{data.address}</p>
            <p style={{ margin: "0.1rem 0" }}>{data.phone} | {data.email}</p>
            {data.website && <p style={{ margin: "0.1rem 0" }}>{data.website}</p>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {data.summary && (
          <section style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ 
              fontSize: "14pt", 
              fontWeight: 600, 
              color: "#2c3e50",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "0.25rem",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Summary
            </h2>
            <div style={{ color: "#555555" }} dangerouslySetInnerHTML={{ __html: data.summary }} />
          </section>
        )}

        {data.experience.length > 0 && (
          <section style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ 
              fontSize: "14pt", 
              fontWeight: 600, 
              color: "#2c3e50",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "0.25rem",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Professional Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ 
                    fontSize: "12pt", 
                    fontWeight: 600, 
                    color: "#2c3e50",
                    margin: "0 0 0.1rem 0"
                  }}>
                    {exp.company}
                  </h3>
                  <span style={{ 
                    fontSize: "10pt", 
                    color: "#7f8c8d",
                    fontWeight: 500
                  }}>
                    {exp.date}
                  </span>
                </div>
                <p style={{ 
                  fontSize: "11pt", 
                  fontWeight: 500, 
                  color: "#34495e",
                  fontStyle: "italic",
                  margin: "0 0 0.5rem 0"
                }}>
                  {exp.position}
                </p>
                <div style={{ 
                  color: "#555555",
                  fontSize: "10.5pt",
                  paddingLeft: "1rem"
                }} dangerouslySetInnerHTML={{ __html: exp.achievements }} />
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ 
              fontSize: "14pt", 
              fontWeight: 600, 
              color: "#2c3e50",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "0.25rem",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ 
                    fontSize: "12pt", 
                    fontWeight: 600, 
                    color: "#2c3e50",
                    margin: "0 0 0.1rem 0"
                  }}>
                    {edu.institution}
                  </h3>
                  <span style={{ 
                    fontSize: "10pt", 
                    color: "#7f8c8d",
                    fontWeight: 500
                  }}>
                    {edu.date}
                  </span>
                </div>
                <p style={{ 
                  fontSize: "11pt", 
                  color: "#34495e",
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
              fontSize: "14pt", 
              fontWeight: 600, 
              color: "#2c3e50",
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: "0.25rem",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Additional Information
            </h2>
            <div style={{ 
              color: "#555555",
              fontSize: "10.5pt"
            }} dangerouslySetInnerHTML={{ __html: data.additionalInfo }} />
          </section>
        )}
      </main>
    </div>
  );
}