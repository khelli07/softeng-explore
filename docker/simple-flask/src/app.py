from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return '<h1>Hello from Flask & Docker</h1>'


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=8000)


# To run docker:
# docker build -t hello-flask .
# docker run -d -p 8000:8000 hello-flask

# To stop docker:
# docker stop <container_id>

# -d : run in detached mode
# -p : map port 8000 on the host to port 8000 in the container
