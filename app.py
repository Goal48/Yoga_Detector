import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide")

st.title(" AI Yoga Pose Detector & Trainer")
st.write("Align your body with the camera to begin your session.")

# Sidebar for controls/instructions
st.sidebar.header("Instructions")
pose_selection = st.sidebar.selectbox("Choose a Pose", ["Tree Pose", "Warrior II", "Plank"])

# Read the HTML/JS file
with open("index.html", "r") as f:
    html_code = f.read()

# Render the p5.js/ml5.js sketch
components.html(html_code, height=1000, width=1000)

# Placeholder for analytics (Mockup data for now)
st.subheader("Session Progress")
col1, col2 = st.columns(2)
col1.metric(label="Pose Accuracy", value="87%", delta="1.2%")
col2.metric(label="Hold Time", value="24 seconds", delta="5s")