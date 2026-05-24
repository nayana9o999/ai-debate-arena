import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

llm = ChatOpenAI(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
    temperature=0.7
)


def call_llm(prompt):
    response = llm.invoke(prompt)
    return response.content


def pro_agent(topic, history):
    prompt = f"""
You are debating FOR the topic.

Topic: {topic}

Debate context:
{history}

Give a strong argument supporting the topic.
"""
    return call_llm(prompt)


def opp_agent(topic, history):
    prompt = f"""
You are debating AGAINST the topic.

Topic: {topic}

Debate context:
{history}

Give a strong counter argument.
"""
    return call_llm(prompt)


def moderator(topic, history):
    prompt = f"""
You are a neutral debate judge.

Topic: {topic}

Debate transcript:
{history}

Decide who won the debate (Pro or Opp) and explain briefly.
"""
    return call_llm(prompt)


def run_debate(topic):

    history = ""
    rounds = []

    for i in range(3):

        pro = pro_agent(topic, history)
        history += f"\nPro: {pro}"
        history = history[-2000:]

        opp = opp_agent(topic, history)
        history += f"\nOpp: {opp}"
        history = history[-2000:]

        rounds.append({
            "round": i+1,
            "pro": pro,
            "opp": opp
        })

    result = moderator(topic, history)

    return {
        "rounds": rounds,
        "winner_decision": result
    }