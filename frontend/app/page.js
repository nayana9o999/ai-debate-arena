"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaRobot, FaBalanceScale } from "react-icons/fa"
import ParticlesBackground from "../components/ParticlesBackground"

export default function Home() {

  const [topic, setTopic] = useState("")
  const [debate, setDebate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const suggestions = [
    "Should AI replace teachers?",
    "Is remote work better?",
    "Should college be free?"
  ]

  async function startDebate(selectedTopic = null) {

    const finalTopic = selectedTopic || topic

    setLoading(true)
    setError("")
    setDebate(null)

    try {

      const res = await fetch("http://localhost:8000/debate", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          topic: finalTopic
        })

      })

      const data = await res.json()

      if (data.error) {

        setError(data.error)

      } else {

        setDebate(data)
      }

    } catch (err) {

      setError("Failed to connect to backend.")
    }

    setLoading(false)
  }

  return (

    <div style={styles.page}>

      {/* PARTICLES BACKGROUND */}

      <ParticlesBackground />

      {/* MAIN CONTENT */}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1 style={styles.title}>
            AI Debate Arena
          </h1>

          <p style={styles.subtitle}>
            Multi-Agent LLM Debate System
          </p>

        </motion.div>

        {/* INPUT */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={styles.inputWrapper}
        >

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a debate topic..."
            style={styles.input}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => startDebate()}
            style={styles.button}
          >

            Start Debate

          </motion.button>

        </motion.div>

        {/* SUGGESTIONS */}

        <div style={styles.suggestionWrapper}>

          {suggestions.map((item) => (

            <motion.button
              key={item}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setTopic(item)
                startDebate(item)
              }}
              style={styles.suggestion}
            >

              {item}

            </motion.button>

          ))}

        </div>

        {/* ERROR */}

        {error && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.errorBox}
          >

            {error}

          </motion.div>
        )}

        {/* LOADING */}

        {loading && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.loadingBox}
          >

            <p style={styles.loadingText}>
              Logic Core is generating arguments...
            </p>

            <p style={styles.loadingText}>
              Counter Engine is preparing rebuttal...
            </p>

            <p style={styles.loadingText}>
              Moderator is evaluating debate...
            </p>

          </motion.div>
        )}

        {/* DEBATE RESULTS */}

        {debate && (

          <div style={styles.debateContainer}>

            {debate.rounds.map((r, index) => (

              <motion.div
                key={r.round}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                style={styles.roundWrapper}
              >

                <h2 style={styles.roundTitle}>
                  ROUND {r.round}
                </h2>

                <div style={styles.cardRow}>

                  {/* PRO CARD */}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={styles.proCard}
                  >

                    <div style={styles.agentHeader}>

                      <FaRobot size={24} color="#60a5fa" />

                      <div>

                        <h3 style={styles.agentTitle}>
                          LOGIC CORE
                        </h3>

                        <p style={styles.agentSub}>
                          Supports Topic
                        </p>

                      </div>

                    </div>

                    <p style={styles.argumentText}>
                      {r.pro}
                    </p>

                  </motion.div>

                  {/* OPP CARD */}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={styles.oppCard}
                  >

                    <div style={styles.agentHeader}>

                      <FaBalanceScale size={24} color="#f472b6" />

                      <div>

                        <h3 style={styles.agentTitle}>
                          COUNTER ENGINE
                        </h3>

                        <p style={styles.agentSub}>
                          Opposes Topic
                        </p>

                      </div>

                    </div>

                    <p style={styles.argumentText}>
                      {r.opp}
                    </p>

                  </motion.div>

                </div>

              </motion.div>
            ))}

            {/* WINNER PANEL */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={styles.winnerPanel}
            >

              <h2 style={styles.winnerTitle}>
                Moderator Decision
              </h2>

              <p style={styles.argumentText}>
                {debate.winner_decision}
              </p>

            </motion.div>

          </div>
        )}

      </div>

    </div>
  )
}

const styles = {

  page: {

    minHeight: "100vh",

    padding: "60px 120px",

    background:
      "radial-gradient(circle at top, #0f172a 0%, #020617 70%)",

    fontFamily: "Arial",

    color: "white",

    overflow: "hidden",

    position: "relative"
  },

  title: {

    textAlign: "center",

    fontSize: "82px",

    fontWeight: "bold",

    marginBottom: "10px",

    background:
      "linear-gradient(to right, #60a5fa, #a78bfa)",

    WebkitBackgroundClip: "text",

    WebkitTextFillColor: "transparent"
  },

  subtitle: {

    textAlign: "center",

    color: "#cbd5e1",

    fontSize: "20px",

    marginBottom: "60px"
  },

  inputWrapper: {

    display: "flex",

    gap: "20px",

    marginBottom: "30px"
  },

  input: {

    flex: 1,

    padding: "24px",

    borderRadius: "22px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "rgba(255,255,255,0.04)",

    color: "white",

    fontSize: "20px",

    outline: "none",

    backdropFilter: "blur(10px)"
  },

  button: {

    padding: "22px 40px",

    borderRadius: "22px",

    border: "none",

    cursor: "pointer",

    background:
      "linear-gradient(to right, #2563eb, #9333ea)",

    color: "white",

    fontSize: "22px",

    fontWeight: "bold",

    boxShadow:
      "0 0 30px rgba(99,102,241,0.35)"
  },

  suggestionWrapper: {

    display: "flex",

    gap: "18px",

    justifyContent: "center",

    marginBottom: "40px",

    flexWrap: "wrap"
  },

  suggestion: {

    padding: "14px 22px",

    borderRadius: "999px",

    border: "1px solid rgba(255,255,255,0.08)",

    background: "rgba(255,255,255,0.05)",

    color: "#e2e8f0",

    cursor: "pointer",

    fontSize: "17px",

    backdropFilter: "blur(10px)"
  },

  errorBox: {

    background: "rgba(239,68,68,0.18)",

    border: "1px solid rgba(239,68,68,0.3)",

    color: "#fecaca",

    padding: "20px",

    borderRadius: "18px",

    marginBottom: "30px",

    textAlign: "center",

    fontSize: "18px"
  },

  loadingBox: {

    marginTop: "40px",

    background: "rgba(255,255,255,0.04)",

    padding: "30px",

    borderRadius: "20px",

    border: "1px solid rgba(255,255,255,0.05)",

    backdropFilter: "blur(12px)"
  },

  loadingText: {

    color: "#cbd5e1",

    marginBottom: "12px",

    fontSize: "18px"
  },

  debateContainer: {

    marginTop: "60px"
  },

  roundWrapper: {

    marginBottom: "60px"
  },

  roundTitle: {

    color: "white",

    marginBottom: "24px",

    fontSize: "30px",

    letterSpacing: "2px"
  },

  cardRow: {

    display: "flex",

    gap: "24px",

    flexWrap: "wrap"
  },

  proCard: {

    flex: 1,

    minWidth: "320px",

    background: "rgba(37,99,235,0.10)",

    border: "1px solid rgba(96,165,250,0.18)",

    borderRadius: "28px",

    padding: "28px",

    backdropFilter: "blur(14px)",

    boxShadow:
      "0 10px 40px rgba(59,130,246,0.12)"
  },

  oppCard: {

    flex: 1,

    minWidth: "320px",

    background: "rgba(168,85,247,0.10)",

    border: "1px solid rgba(216,180,254,0.18)",

    borderRadius: "28px",

    padding: "28px",

    backdropFilter: "blur(14px)",

    boxShadow:
      "0 10px 40px rgba(168,85,247,0.12)"
  },

  agentHeader: {

    display: "flex",

    alignItems: "center",

    gap: "14px",

    marginBottom: "20px"
  },

  agentTitle: {

    margin: 0,

    fontSize: "22px"
  },

  agentSub: {

    margin: 0,

    color: "#94a3b8",

    fontSize: "14px"
  },

  argumentText: {

    color: "#e5e7eb",

    lineHeight: "1.9",

    fontSize: "17px"
  },

  winnerPanel: {

    marginTop: "80px",

    background: "rgba(255,255,255,0.05)",

    borderRadius: "28px",

    padding: "35px",

    border: "1px solid rgba(255,255,255,0.08)",

    backdropFilter: "blur(14px)"
  },

  winnerTitle: {

    color: "#60a5fa",

    marginBottom: "24px",

    fontSize: "32px"
  }
}