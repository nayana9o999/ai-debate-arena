import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

# ==============================
# INITIALIZE LLM
# ==============================

llm = ChatOpenAI(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
    temperature=0.8
)


# ==============================
# SAFE LLM CALL
# ==============================

def call_llm(prompt):

    try:

        response = llm.invoke(prompt)

        return response.content.strip()

    except Exception as e:

        print("LLM ERROR:", e)

        return "LLM temporarily unavailable."


# ==============================
# BASIC TOPIC VALIDATION
# ==============================

def evaluate_topic_quality(topic):

    if not topic:
        return False, "Topic cannot be empty."

    topic = topic.strip()

    if len(topic) < 10:
        return False, "Topic is too short. Please enter a meaningful debate topic."

    if not any(char.isalpha() for char in topic):
        return False, "Topic must contain readable words."

    unique_chars = set(topic.lower())

    if len(unique_chars) < 3:
        return False, "Topic appears nonsensical."

    return True, None


# ==============================
# SEMANTIC MODERATION
# ==============================

def classify_topic_semantics(topic):

    prompt = f"""
You are an academic content moderation system.

Your task is to classify whether a debate topic
is appropriate for an educational AI debate platform.

Debate Topic:
"{topic}"

Classification Categories:

VALID
MEANINGLESS
INAPPROPRIATE
UNSAFE

Rules:

- Academic discussions of sensitive subjects are VALID.
- Random nonsense is MEANINGLESS.
- Explicit vulgar content is INAPPROPRIATE.
- Harmful or illegal encouragement is UNSAFE.

Examples of VALID:
- Should porn be banned?
- Should sex education be mandatory?
- Should violent games be regulated?
- Should AI replace teachers?

Respond with ONLY ONE WORD.
"""

    result = call_llm(prompt)

    if not result:
        return "UNSAFE"

    return result.strip().upper()


# ==============================
# PRO AGENT
# ==============================

def pro_agent(topic, history):

    prompt = f"""
You are the PRO side in a formal debate.

The PRO side MUST argue YES in favor of the proposition.

Example:
Topic: "Should AI replace teachers?"
PRO stance:
"Yes, AI should replace teachers."

STRICT RULES:
- Always defend the proposition.
- Never argue against the proposition.
- Directly rebut the opponent.
- Sound natural and intelligent.
- Keep responses concise.
- Avoid repetitive formal phrases.
- Avoid robotic essay writing.
- Focus on one strong point.

Debate Topic:
{topic}

Debate History:
{history}

Generate the next PRO argument.

Maximum 100 words.
"""

    return call_llm(prompt)


# ==============================
# OPP AGENT
# ==============================

def opp_agent(topic, history):

    prompt = f"""
You are the OPPOSITION side in a formal debate.

The OPPOSITION side MUST argue NO against the proposition.

Example:
Topic: "Should AI replace teachers?"
OPPOSITION stance:
"No, AI should not replace teachers."

STRICT RULES:
- Always oppose the proposition.
- Never support the proposition.
- Directly attack weaknesses in the PRO argument.
- Sound natural and analytical.
- Keep responses concise.
- Avoid repetitive filler.
- Avoid robotic essay writing.
- Focus on one strong counterargument.

Debate Topic:
{topic}

Debate History:
{history}

Generate the next OPPOSITION argument.

Maximum 100 words.
"""

    return call_llm(prompt)


# ==============================
# MODERATOR
# ==============================

def moderator(topic, history):

    prompt = f"""
You are a professional debate moderator.

Debate Topic:
{topic}

Debate Transcript:
{history}

Your task:
- Decide which side argued better.
- Evaluate logic, rebuttals, clarity, and persuasiveness.
- Sound analytical and professional.
- Avoid generic praise.

Respond EXACTLY in this format:

Winner: Pro or Opp
Reason: Short explanation
"""

    return call_llm(prompt)


# ==============================
# MAIN DEBATE ENGINE
# ==============================

def run_debate(topic):

    # --------------------------
    # STEP 1 — VALIDATION
    # --------------------------

    valid, message = evaluate_topic_quality(topic)

    if not valid:

        return {
            "error": message
        }

    # --------------------------
    # STEP 2 — SEMANTIC MODERATION
    # --------------------------

    classification = classify_topic_semantics(topic)

    if classification == "MEANINGLESS":

        return {
            "error": "Please enter a meaningful debate topic."
        }

    if classification == "INAPPROPRIATE":

        return {
            "error": "This topic contains inappropriate content."
        }

    if classification == "UNSAFE":

        return {
            "error": "This topic is unsafe or harmful."
        }

    # --------------------------
    # STEP 3 — RUN DEBATE
    # --------------------------

    history = ""

    rounds = []

    for i in range(2):

        # ------------------
        # PRO RESPONSE
        # ------------------

        pro = pro_agent(topic, history)

        history += f"\nPRO: {pro}"

        history = history[-700:]

        # ------------------
        # OPP RESPONSE
        # ------------------

        opp = opp_agent(topic, history)

        history += f"\nOPPOSITION: {opp}"

        history = history[-700:]

        rounds.append({

            "round": i + 1,

            "pro": pro,

            "opp": opp

        })

    # --------------------------
    # STEP 4 — MODERATOR
    # --------------------------

    result = moderator(topic, history)

    return {

        "rounds": rounds,

        "winner_decision": result

    }