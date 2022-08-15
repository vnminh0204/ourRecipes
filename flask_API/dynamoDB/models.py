from uuid import uuid4


class User:
    def __init__(self, username, password, displayname, age, weight, height, gender, uid):
        self.username = username
        self.password = password
        self.displayname = displayname
        self.age = age
        self.weight = weight
        self.height = height
        self.gender = gender
        self.uid = uid if uid else uuid4().hex
