
# Get current timestamp
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

# Prompt for commit message
read -p "Enter commit message: " message

# Add and commit with timestamp
git add .
git commit -m "[$timestamp] $message"


git push origin main

