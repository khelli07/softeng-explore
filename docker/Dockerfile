FROM python:3.9-alpine

# Create folder
RUN mkdir -p /usr/src/app 
# CD to folder
WORKDIR /usr/src/app

# Copy this folder to workdir folder (/usr/src/app ) ?
COPY . .

# Run rest of app
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt 
CMD ["python", "src/app.py", "--host=0.0.0.0"]
