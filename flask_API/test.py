from urllib import response
import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "manga/1", {"name": "deptrai", "desc": "dasda", "no_chapters" : 12})
print(response.json())

input()
response = requests.get(BASE + "manga/1")
print(response)