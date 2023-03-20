import json
import os
from json.decoder import JSONDecodeError
from wsgiref.simple_server import make_server

import falcon
from bson import json_util

from mongo import dbcol


class Hello:
    def on_get(self, req, res):
        res.status = falcon.HTTP_200
        res.text = json.dumps(
            {"message": "Hello World!", "env": os.environ.get("ENV", "dev")}
        )

    def on_post(self, req, res):
        res.status = falcon.HTTP_200
        body = json.load(req.bounded_stream)
        res.text = json.dumps({"body": body})


class Document:
    def on_get(self, req, res):
        try:
            res.status = falcon.HTTP_200
            try:
                body = json.load(req.bounded_stream)
                response = dbcol.find(body)
            except (TypeError, JSONDecodeError):
                response = dbcol.find()

            res.text = json.dumps({"data": json.loads(json_util.dumps(response))})
        except Exception as e:
            res.status = falcon.HTTP_500
            res.text = json.dumps({"message": str(e)})

    def on_post(self, req, res):
        """
        Example request body:
        {
            "data": [
                {
                    "name": "Subtle Art of Not Giving a F*ck",
                    "author": "Mark Manson"
                },
                ...
            ]
        }
        """
        try:
            body = json.load(req.bounded_stream)
        except (TypeError, JSONDecodeError):
            res.status = falcon.HTTP_400
            res.text = json.dumps({"message": "Invalid request body"})

        if "body" not in body:
            res.status = falcon.HTTP_400
            res.text = json.dumps({"message": "Must provide data"})

        res.status = falcon.HTTP_200
        dbcol.insert_many(body.get("data"))
        res.text = json.dumps(
            {"message": f'Inserted {len(body.get("data"))} documents successfully'}
        )

    def on_put(self, req, res):
        """
        Example request body:
        {
            "filter": {
                "name": "Subtle Art of Not Giving a F*ck"
            },
            "set": {
                "author": "Mark Manson"
            }
        }
        """
        res.status = falcon.HTTP_200
        try:
            body = json.load(req.bounded_stream)
        except (TypeError, JSONDecodeError):
            res.status = falcon.HTTP_400
            res.text = json.dumps({"message": "Invalid request body"})

        if "filter" not in body or "set" not in body:
            res.status = falcon.HTTP_400
            res.text = json.dumps({"message": "Must provide filter and set"})

        dbcol.update_one(
            body.get("filter"),
            {
                "$set": body.get("set"),
                "$currentDate": {"lastModified": True},
            },
        )
        res.text = json.dumps({"message": "Updated document successfully"})

    def on_delete(self, req, res):
        res.status = falcon.HTTP_200
        try:
            body = json.load(req.bounded_stream)
        except (TypeError, JSONDecodeError):
            res.status = falcon.HTTP_400
            res.text = json.dumps({"message": "Invalid request body"})

        dbcol.delete_one(body)
        res.text = json.dumps({"message": "Deleted document successfully"})


app = falcon.App()
app.add_route("/", Hello())
app.add_route("/doc", Document())

if __name__ == "__main__":
    httpd = make_server("0.0.0.0", 8000, app)
    print("Server is running on port 8000")
    httpd.serve_forever()
