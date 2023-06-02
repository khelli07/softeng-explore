import random

import pandas as pd

df = pd.DataFrame(columns=["embedding", "title", "is_available"])

df["embedding"] = [[random.random() for i in range(8)] for j in range(10)]
df["title"] = ["title" + str(i) for i in range(10)]
df["is_available"] = [True if random.random() > 0.5 else False for i in range(10)]

df.to_csv("book.csv", index=False)
