import re

path = "c:/Users/User/Desktop/13AL Landing Page Code/index.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Regex to remove HTML
content = re.sub(r'<!-- Sticky WA -->\s*<a id="wa-fab".*?</a>', '', content, flags=re.DOTALL)

# Regex to remove CSS
content = re.sub(r'/\* Sticky WA fab \*/\s*#wa-fab \{.*?border-radius: 50%;\s*\}\s*\}', '', content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("done")
