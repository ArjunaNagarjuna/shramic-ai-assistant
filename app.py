import streamlit as st
from backend.chatbot import ask_chatbot

st.set_page_config(
    page_title="Shramic Networks AI Assistant",
    page_icon="🤖",
    layout="wide"
)

st.title("🤖 Shramic Networks AI Assistant")

st.markdown("""
Ask anything about:

- Company Information
- Shramic Krushi
- Shramic Build
- Worker App
- Internships
- Contact Information
""")

if "messages" not in st.session_state:
    st.session_state.messages = []

question = st.chat_input("Ask your question...")

if question:
    st.session_state.messages.append(
        {"role": "user", "content": question}
    )

    answer = ask_chatbot(question)

    st.session_state.messages.append(
        {"role": "assistant", "content": answer}
    )

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])