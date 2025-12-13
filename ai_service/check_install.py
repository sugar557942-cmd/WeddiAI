
import sys
try:
    from google import genai
    with open("install_status.txt", "w") as f:
        f.write("SUCCESS")
    print("SUCCESS")
except ImportError:
    with open("install_status.txt", "w") as f:
        f.write("FAILURE")
    print("FAILURE")
