import sys
print(sys.path)
from src.flask_API.lib import *
import json

class TestNutrition:
    with open("src/flask_API/example.json", 'r') as f:
        nutrition = json.load(f)["nutritionTable"]
    def test_calories(self):
        result = calculate_calories(self.nutrition.get("nutritionTable", {}).get("kcal", 0))
        assert result == 1
    def test_sugar(self):
        pass
        result = calculate_sugar(self.nutrition.get("nutritionTable", {}).get("sugar", 0))
        assert result == 2
    def test_fat(self):
        pass
    def test_sodium(self):
        pass
    def test_protein(self):
        pass
    def test_fiber(self):
        pass
    def test_carbohydrates(self):
        pass
    def test_score(self):
        pass