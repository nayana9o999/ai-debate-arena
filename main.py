import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate

# Load API key from .env
load_dotenv()

# Initialize Groq LLM through LangChain
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
You are a debater arguing FOR the topic.

Topic: {topic}

Previous debate context:
{history}

Give a strong argument supporting the topic.
"""
    return call_llm(prompt)


def opp_agent(topic, history):
    prompt = f"""
You are a debater arguing AGAINST the topic.

Topic: {topic}

Previous debate context:
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

Decide which side won the debate (Pro or Opp).
Explain your reasoning briefly.
"""
    return call_llm(prompt)


def main():

    topic = input("Enter debate topic: ")

    history = ""
    rounds = 3

    for i in range(rounds):

        print(f"\n--- ROUND {i+1} ---")

        pro = pro_agent(topic, history)
        print("\nPro:", pro)

        history += f"\nPro: {pro}"

        # limit memory size
        history = history[-2000:]

        opp = opp_agent(topic, history)
        print("\nOpp:", opp)

        history += f"\nOpp: {opp}"

        # limit memory size
        history = history[-2000:]

    print("\n--- MODERATOR DECISION ---")

    result = moderator(topic, history)

    print("\nWinner Decision:")
    print(result)


if __name__ == "__main__":
    main()