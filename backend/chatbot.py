import json
import os

FAQ_FILE = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "docs",
    "multilingual_faq.json"
)

with open(FAQ_FILE, "r", encoding="utf-8") as f:
    FAQS = json.load(f)
    print("FAQ Count:", len(FAQS))
print("Vaishnavi Exists:", "who is vaishnavi" in FAQS)
print("Founder Exists:", "who founded shramic networks" in FAQS)
print("FAQ Count:", len(FAQS))

def normalize_question(question):
    question = question.lower().strip()

    for ch in ["?", ".", ",", "!", ":", ";", "'", '"']:
        question = question.replace(ch, "")

    return question


def ask_chatbot(question):

    try:

        q = normalize_question(question)
        print("Question:", q) 
        # Exact Match
        if q in FAQS:
            return FAQS[q]

        # Partial Match
        for faq_question, faq_answer in FAQS.items():

            faq_q = normalize_question(faq_question)

            if faq_q in q or q in faq_q:
                return faq_answer

        return (
            "Sorry, I could not find that information in the "
            "Shramic Networks knowledge base."
        )

    except Exception as e:

        print("Chatbot Error:", str(e))

        return "Our chatbot service is temporarily unavailable."