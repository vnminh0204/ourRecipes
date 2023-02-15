import flask_server.lib.ingredientsConstants as IGC


def calculate_calories(amount):
    # if amount < IGC.CALORIES[0]:
    #     return 0

    for i in range(len(IGC.CALORIES) - 1, -1, -1):
        if amount > IGC.CALORIES[i]:
            # print(i, IGC.CALORIES[i])
            return i
    return 0


def calculate_sugar(amount):

    for i in range(len(IGC.SUGAR) - 1, -1, -1):
        if amount > IGC.SUGAR[i]:
            # print(i, IGC.SUGAR[i])
            return i
    return 0


def calculate_fat(saturatedFat, totalFat):
    # if (saturatedFat) == 0:
    for i in range(len(IGC.PERCENTATGE_SATURATED_FAT) - 1, -1, -1):
        if saturatedFat > IGC.PERCENTATGE_SATURATED_FAT[i]:
            # print(i, IGC.PERCENTATGE_SATURATED_FAT[i])
            return i
    return 0


def calculate_sodium(amount):
    for i in range(len(IGC.SODIUM) - 1, -1, -1):
        if amount > IGC.SODIUM[i]:
            # print(i, IGC.SODIUM[i])
            return i
    return 0


def calculate_protein(amount):
    for i in range(len(IGC.PROTEIN) - 1, -1, -1):
        if amount > IGC.PROTEIN[i]:
            # print(i, IGC.PROTEIN[i])
            return i
    return 0


def calculate_fiber(amount):
    for i in range(len(IGC.FIBER) - 1, -1, -1):
        if amount > IGC.FIBER[i]:
            # print(i, IGC.FIBER[i])
            return i
    return 0


def calculate_carbohydrates(amount):
    for i in range(len(IGC.CARBOHYDRATES) - 1, -1, -1):
        if amount > IGC.CARBOHYDRATES[i]:
            # print(i, IGC.CARBOHYDRATES[i])
            return i
    return 0


def calculate_score(
    calories, sugar, saturatedFat, totalFat, sodium, protein, fiber, carbohydrates
):
    raw_score = (
        calculate_calories(calories)
        + calculate_sugar(sugar)
        + calculate_fat(saturatedFat, totalFat)
        + calculate_sodium(sodium)
    ) - (
        calculate_protein(protein)
        + calculate_fiber(fiber)
        + calculate_carbohydrates(carbohydrates)
    )
    norm_score = (
        1 - normalize(raw_score, -15, 40)
    ) * 100  # Normalize to range of 0 to 100.
    return norm_score


def normalize(raw_score, min_score, max_score):
    """
    Normalize raw score to the range from 0 to 1.
    """
    norm_score = (raw_score - min_score) / (max_score - min_score)
    return norm_score


# print(calculateScore(1590, 22.4, 0.6, 100, 0.22, 8.5, 8.6, 0))
