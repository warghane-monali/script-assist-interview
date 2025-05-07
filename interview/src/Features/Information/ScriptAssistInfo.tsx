import React from 'react'
import MenuBar from '../../components/Layout/MenuBar'

function ScriptAssistInfo() {


    return (
        <>

            <div style={{ height: "100vh" }}>
                <MenuBar title="Script Assist Info" />

                <div style={{
                    width: "80vw", padding: "20px", height: "92vh", // Set your desired height
                    overflowY: "auto"
                }}>
                    <p style={{ fontSize: "var(--heading1)" }}>We are Script Assist</p>
                    <div style={{ margin: "10px", width: "60vw" }}>

                        <h4 style={{ fontSize: "18px", fontWeight: 600, color: 'var(--darkPurple)' }}>Our Mission</h4>
                        <p style={{ fontSize: "var(--paragraph2)" }}>
                            Born from a blend of clinical expertise and innovative tech,
                            Script Assist was created by doctors, patients,
                            and specialists who understood the challenges of traditional prescribing.
                            We listened, learned, and built a platform that transforms the way medical cannabis is
                            accessed—streamlining workflows, reducing errors, and ultimately putting patient care first.
                        </p>

                        <h4 style={{ fontSize: "18px", fontWeight: 600, color: 'var(--darkPurple)', marginTop: "10px" }}>Our Story</h4>
                        <p style={{ fontSize: "var(--paragraph2)" }}>
                            We believe every patient in the UK who has exhausted licensed medications deserves equal access to medical cannabis. Our mission is to empower healthcare providers with state-of-the-art digital tools that simplify prescribing and improve outcomes. We’re committed to making this a reality through continuous innovation and unwavering dedication.
                        </p>

                        <h4 style={{ fontSize: "18px", fontWeight: 600, color: 'var(--darkPurple)', marginTop: "10px" }}>What We Do</h4>
                        <p style={{ fontSize: "var(--paragraph2)" }}>
                            Script Assist is more than just software—it’s a fully integrated, white‑labelled digital solution for clinics, pharmacies, and prescribers. We enable efficient, secure, and data-driven operations that allow healthcare professionals to focus on what matters most: delivering exceptional patient care.

                            Join us as we redefine the future of medical cannabis prescribing in the UK.
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ScriptAssistInfo
