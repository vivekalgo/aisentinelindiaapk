try:
    import google.generativeai as genai
    print("SUCCESS: google-generativeai imported")
except ImportError as e:
    print(f"ERROR: {e}")
except Exception as e:
    print(f"ERROR: {e}")
